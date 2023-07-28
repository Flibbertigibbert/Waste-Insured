// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);
    function approve(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
    function totalSupply() external view  returns (uint256);
    function balanceOf(address) external view  returns (uint256);
    function allowance(address, address) external view  returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract WasteManagement {
    
    // cUSD token contract address
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    // Struct to represent waste records
    struct Waste {
        address payable producer;
        string wasteType; 
        string collectionLocation;
        uint256 weight;
        bool isRecorded;
        bool isValidated;
        bool isPaid;
        uint256 partnerId; // Partner ID assigned by the waste admin
    }

    // Struct to represent information about partners
    struct Partner {
        string name;
        string location;
        string partnerType;
        address payable walletAddress;
    }

    // Mapping to store waste records
    mapping(uint256 => Waste) public wasteRecords;
    uint256 public wasteCounter;

    // Mapping to keep track of assigned collectors
    mapping(address => bool) public assignedCollector;

    // Address of the waste admin
    address payable public wasteAdmin;

    // Mapping to store information about partners
    mapping(uint256 => Partner) public partners;
    uint256 public partnerCounter; // Counter to track the number of registered partners

    // Events
    event WasteRecorded(uint256 indexed wasteId, address indexed producer, string wasteType, string collectionLocation, uint256 weight, uint256 partnerId);
    event WasteValidated(uint256 indexed wasteId, address indexed wasteAdmin);
    event PaymentSent(address indexed recipient, uint256 amount);
    event FundsWithdrawn(address indexed wasteAdmin, uint256 amount);
    event FundsDeposited(address indexed wasteAdmin, uint256 amount);
    event PartnerRegistered(uint256 indexed partnerId, string name, string location, string partnerType, address walletAddress);

    // Modifier to restrict access to assigned collectors
    modifier onlyCollector() {
        require(assignedCollector[msg.sender], "Must be a collector");
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
        partnerCounter = 0;
    }

    // Function for the waste admin to register a partner
    function registerPartner(string memory _name, string memory _location, string memory _partnerType, address payable _walletAddress) public onlyWasteAdmin {
        require(_walletAddress != address(0), "Invalid partner address");

        partnerCounter++;
        partners[partnerCounter] = Partner(_name, _location, _partnerType, _walletAddress);
        emit PartnerRegistered(partnerCounter, _name, _location, _partnerType, _walletAddress);
    }

    // Function for a producer to choose a partner based on the partner ID
    function assignProducer(address payable _collector) public {
        require(_collector != address(0), "Invalid producer address");

        assignedCollector[_collector] = true;
    }

    // Function for a producer to record waste information
    function recordWaste(string memory _wasteType, string memory _collectionLocation, uint256 _weight, uint256 _partnerId) public onlyCollector {
        wasteCounter++;
        wasteRecords[wasteCounter] = Waste(payable(msg.sender), _wasteType, _collectionLocation, _weight, true, false, false, _partnerId);
        emit WasteRecorded(wasteCounter, msg.sender, _wasteType, _collectionLocation, _weight, _partnerId);
    }

    // Function for the waste admin to know if the recorded waste is validated
    function validateWaste(uint256 _wasteId) public onlyWasteAdmin {
        require(_wasteId <= wasteCounter, "Invalid waste ID");
        require(wasteRecords[_wasteId].isRecorded, "Waste is not yet recorded");
        require(!wasteRecords[_wasteId].isValidated, "Waste is already validated");

        emit WasteValidated(_wasteId, msg.sender);
    }

    // Function for the waste admin to send payment to a partner
    function wastePayment(uint256 _wasteId, uint256 _amount, address payable _partner) external onlyWasteAdmin {
        require(!wasteRecords[_wasteId].isValidated, "Waste is already validated");
        require(
            IERC20Token(cUsdTokenAddress).transfer(_partner, _amount),
            "Transfer failed"
        );
        
        wasteRecords[_wasteId].isValidated = true;
        wasteRecords[_wasteId].isPaid = true;
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
        string memory wasteType,
        string memory collectionLocation,
        uint256 weight,
        bool isRecorded,
        bool isValidated,
        bool isPaid,
        uint256 partnerId
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
            waste.partnerId
        );
    }

    // Function to get the total number of registered partners
    function getPartnerCount() public view returns (uint256) {
        return partnerCounter;
    }

    // Function to get information about a specific partner by partner ID
    function getPartnerInfo(uint256 _partnerId) public view returns (string memory name, string memory location, string memory partnerType, address walletAddress) {
        require(_partnerId <= partnerCounter && _partnerId > 0, "Invalid Partner ID");

        Partner storage partner = partners[_partnerId];

        return (
            partner.name,
            partner.location,
            partner.partnerType,
            partner.walletAddress
        );
    }

    // Fallback function to receive funds
    receive() external payable {}
}
