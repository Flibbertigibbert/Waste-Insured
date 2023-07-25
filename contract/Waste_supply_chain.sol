// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WasteManagement {
    // Enum to represent waste types
    enum WasteType { Plastic, Metal }

    // Struct to represent waste records
    struct Waste {
        address payable producer;
        uint256 wasteType; // Store the waste type as an integer (0 for Plastic, 1 for Metal)
        string collectionLocation;
        uint256 weight;
        bool isRecorded;
        bool isValidated;
        bool isPaid;
        uint256 hospitalId; // Hospital ID assigned by the waste admin
    }

    // Struct to represent information about hospitals
    struct Hospital {
        string name;
        string location;
        address walletAddress;
    }

    // Mapping to store waste records
    mapping(uint256 => Waste) public wasteRecords;
    uint256 public wasteCounter;

    // Mapping to keep track of which hospital is chosen by each producer
    mapping(address => uint256) public chosenHospitals;

    // Address of the waste admin (previously named Collector)
    address payable public wasteAdmin;

    // Mapping to store information about hospitals
    mapping(uint256 => Hospital) public hospitals;
    uint256 public hospitalCounter; // Counter to track the number of registered hospitals

    // Events
    event WasteRecorded(uint256 indexed wasteId, address indexed producer, string wasteType, string collectionLocation, uint256 weight, uint256 hospitalId);
    event WasteValidated(uint256 indexed wasteId, address indexed wasteAdmin);
    event PaymentSent(address indexed recipient, uint256 amount);
    event FundsWithdrawn(address indexed wasteAdmin, uint256 amount);
    event FundsDeposited(address indexed wasteAdmin, uint256 amount);
    event HospitalRegistered(uint256 indexed hospitalId, string name, string location, address walletAddress);

    // Modifier to restrict access to assigned producers
    modifier onlyProducer() {
        require(chosenHospitals[msg.sender] != 0, "You must choose a hospital before performing this action");
        _;
    }


    // Modifier to restrict access to the waste admin
    modifier onlyWasteAdmin() {
        require(msg.sender == wasteAdmin, "Only the waste admin can perform this action");
        _;
    }

    // Constructor to set the waste admin during deployment
    constructor() payable {
        wasteAdmin = payable(msg.sender);
        hospitalCounter = 0;
    }

    // Function for the waste admin to register a partnered hospital
    function registerPartnerHospital(string memory _name, string memory _location, address _walletAddress) public onlyWasteAdmin {
        require(_walletAddress != address(0), "Invalid hospital address");

        hospitalCounter++;
        hospitals[hospitalCounter] = Hospital(_name, _location, _walletAddress);
        emit HospitalRegistered(hospitalCounter, _name, _location, _walletAddress);
    }

    
    // Function for a producer to choose a hospital based on the hospital ID
    function chooseHospital(uint256 _hospitalId) public {
        require(_hospitalId <= hospitalCounter && _hospitalId > 0, "Invalid hospital ID");

        chosenHospitals[msg.sender] = _hospitalId;
    }

    // Helper function to convert WasteType enum to string
    function wasteTypeToString(WasteType _wasteType) internal pure returns (string memory) {
        if (_wasteType == WasteType.Plastic) {
            return "Plastic";
        } else if (_wasteType == WasteType.Metal) {
            return "Metal";
        } else {
            revert("Invalid waste type");
        }
    }

    // Function for a producer to record waste information
    function recordWaste(WasteType _wasteType, string memory _collectionLocation, uint256 _weight) public onlyProducer {
        uint256 hospitalId = chosenHospitals[msg.sender];
        require(hospitals[hospitalId].walletAddress != address(0), "You must choose a hospital before recording waste");
        require(_wasteType == WasteType.Plastic || _wasteType == WasteType.Metal, "Invalid waste type");

        wasteCounter++;
        
        wasteRecords[wasteCounter] = Waste(payable(msg.sender), uint256(_wasteType), _collectionLocation, _weight, true, false, false, hospitalId);

        emit WasteRecorded(wasteCounter, msg.sender, wasteTypeToString(_wasteType), _collectionLocation, _weight, hospitalId);
    }


    
    // Function for the waste admin to validate recorded waste
    function validateWaste(uint256 _wasteId) public onlyWasteAdmin {
        require(_wasteId <= wasteCounter, "Invalid waste ID");
        require(wasteRecords[_wasteId].isRecorded, "Waste is not yet recorded");
        require(!wasteRecords[_wasteId].isValidated, "Waste is already validated");

        wasteRecords[_wasteId].isValidated = true;

        emit WasteValidated(_wasteId, msg.sender);

        // Get the waste type for the given waste ID
        WasteType wasteType = WasteType(wasteRecords[_wasteId].wasteType);

        // Calculate payment amount based on weight and rate (20 weight units per 1 Ether for Plastic, 40 weight units per 1 Ether for Metal)
        uint256 rate = (wasteType == WasteType.Plastic) ? 20 : 40;
        uint256 paymentAmount = (wasteRecords[_wasteId].weight * 1 ether) / rate;

        // Automatically send payment to the assigned hospital
        transferPayment(hospitals[wasteRecords[_wasteId].hospitalId].walletAddress, paymentAmount);
    }



    // Function for the waste admin to send payment to a hospital
    function transferPayment(address _recipient, uint256 _amount) internal {
    address payable recipient = payable(_recipient);
    recipient.transfer(_amount);
    }

    // Function for the waste admin to withdraw funds from the contract
    function withdrawFunds(uint256 _amount) public onlyWasteAdmin {
        uint256 withdrawalAmount = _amount * 1 ether; // Convert the amount from Ether to wei

        require(withdrawalAmount <= address(this).balance, "Insufficient contract balance");
        wasteAdmin.transfer(withdrawalAmount);
        emit FundsWithdrawn(wasteAdmin, withdrawalAmount);
    }

    // Function for the waste admin to deposit funds into the contract
    function depositFunds() public payable onlyWasteAdmin {
        emit FundsDeposited(wasteAdmin, msg.value);
    }

    // Function to get waste information by waste ID
    function getWasteInfo(uint256 _wasteId) public view returns (
        address producer,
        uint256  wasteType,
        string memory collectionLocation,
        uint256 weight,
        bool isRecorded,
        bool isValidated,
        bool isPaid,
        uint256 hospitalId
    ) {
        require(_wasteId <= wasteCounter && _wasteId > 0, "Invalid waste ID");

        Waste storage waste = wasteRecords[_wasteId];

        return (
            waste.producer,
            waste.wasteType,
            waste.collectionLocation,
            waste.weight,
            waste.isRecorded,
            waste.isValidated,
            waste.isPaid,
            waste.hospitalId
        );
    }

     // Function to get the total number of registered hospitals
    function getHospitalCount() public view returns (uint256) {
        return hospitalCounter;
    }

    // Function to get information about a specific hospital by hospital ID
    function getHospitalInfo(uint256 _hospitalId) public view returns (string memory name, string memory location, address walletAddress) {
        require(_hospitalId <= hospitalCounter && _hospitalId > 0, "Invalid hospital ID");

        Hospital storage hospital = hospitals[_hospitalId];

        return (
            hospital.name,
            hospital.location,
            hospital.walletAddress
        );
    }

    // Function to get the available waste types
    function getAvailableWasteTypes() public pure returns (string[] memory) {
        string[] memory wasteTypes = new string[](2);
        wasteTypes[0] = "Plastic";
        wasteTypes[1] = "Metal";
        return wasteTypes;
    }

    
    // Fallback function to receive funds
    receive() external payable {}
}
