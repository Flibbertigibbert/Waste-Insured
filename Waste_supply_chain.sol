// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//A WasteManagement contract that register people who bring waste(producer)
//The registered producers record waste information. 
//he waste information is validated by the collector,
// and payment is made to the producer based on the weight of the waste



contract WasteManagement {
    // Struct to represent waste records
    struct Waste {
        address payable producer;
        string wasteType;
        string collectionLocation;
        uint256 weight;
        bool isRecorded;
        bool isValidated;
        bool isPaid;
    }

    // Mapping to store waste records
    mapping(uint256 => Waste) public wasteRecords;
    uint256 public wasteCounter;

    // Address of the collector
    address payable public collector;

    // Mapping to keep track of assigned producers
    mapping(address => bool) public assignedProducers;

    // Events
    event WasteRecorded(uint256 indexed wasteId, address indexed producer, string wasteType, string collectionLocation, uint256 weight);
    event WasteValidated(uint256 indexed wasteId, address indexed collector);
    event PaymentSent(address indexed producer, uint256 amount);
    event FundsWithdrawn(address indexed collector, uint256 amount);
    event FundsDeposited(address indexed collector, uint256 amount);

    // Modifier to restrict access to assigned producers
    modifier onlyProducer() {
        require(assignedProducers[msg.sender], "Only the assigned producer can perform this action");
        _;
    }

    // Modifier to restrict access to the collector
    modifier onlyCollector() {
        require(msg.sender == collector, "Only the collector can perform this action");
        _;
    }

    // Constructor to set the collector during deployment
    constructor() payable {
        collector = payable(msg.sender);
    }

    // Function for any producer to register themselves in the system
    function assignProducer(address payable _producer) public {
        require(_producer != address(0), "Invalid producer address");

        assignedProducers[_producer] = true;
    }

    // Function for a producer to record waste information
    function recordWaste(string memory _wasteType, string memory _collectionLocation, uint256 _weight) public onlyProducer {
        wasteCounter++;
        wasteRecords[wasteCounter] = Waste(payable(msg.sender), _wasteType, _collectionLocation, _weight, true, false, false);

        emit WasteRecorded(wasteCounter, msg.sender, _wasteType, _collectionLocation, _weight);
    }

    // Function for the collector to validate recorded waste
    function validateWaste(uint256 _wasteId) public onlyCollector {
        require(_wasteId <= wasteCounter, "Invalid waste ID");
        require(wasteRecords[_wasteId].isRecorded, "Waste is not yet recorded");
        require(!wasteRecords[_wasteId].isValidated, "Waste is already validated");

        wasteRecords[_wasteId].isValidated = true;

        emit WasteValidated(_wasteId, msg.sender);

        // Calculate payment amount based on weight and rate (40 weight units per 1 Ether)
        uint256 paymentAmount = (wasteRecords[_wasteId].weight * 1 ether) / 40;

        require(address(this).balance >= paymentAmount, "Insufficient contract balance");

        wasteRecords[_wasteId].isPaid = true; // Mark the waste as paid before transferring the payment
        emit PaymentSent(wasteRecords[_wasteId].producer, paymentAmount);

        // Automatically send payment to the producer
        transferPayment(wasteRecords[_wasteId].producer, paymentAmount);
    }

    // Function for the collector to send payment to a producer
    function transferPayment(address payable _recipient, uint256 _amount) internal {
        _recipient.transfer(_amount);
    }

    // Function for the collector to withdraw funds from the contract
    function withdrawFunds(uint256 _amount) public onlyCollector {
        uint256 withdrawalAmount = _amount * 1 ether; // Convert the amount from Ether to wei

        require(withdrawalAmount <= address(this).balance, "Insufficient contract balance");
        collector.transfer(withdrawalAmount);
        emit FundsWithdrawn(collector, withdrawalAmount);
    }

    // Function for the collector to deposit funds into the contract
    function depositFunds() public payable onlyCollector {
        emit FundsDeposited(collector, msg.value);
    }

    // Function to get all waste records stored in the contract
    function getAllWasteRecords() public view returns (
        uint256[] memory wasteIds,
        address[] memory producers,
        string[] memory wasteTypes,
        string[] memory collectionLocations,
        uint256[] memory weights,
        bool[] memory isRecorded,
        bool[] memory isValidated,
        bool[] memory isPaid
    ) {
        wasteIds = new uint256[](wasteCounter);
        producers = new address[](wasteCounter);
        wasteTypes = new string[](wasteCounter);
        collectionLocations = new string[](wasteCounter);
        weights = new uint256[](wasteCounter);
        isRecorded = new bool[](wasteCounter);
        isValidated = new bool[](wasteCounter);
        isPaid = new bool[](wasteCounter);

        for (uint256 i = 1; i <= wasteCounter; i++) {
            Waste storage waste = wasteRecords[i];
            wasteIds[i - 1] = i;
            producers[i - 1] = waste.producer;
            wasteTypes[i - 1] = waste.wasteType;
            collectionLocations[i - 1] = waste.collectionLocation;
            weights[i - 1] = waste.weight;
            isRecorded[i - 1] = waste.isRecorded;
            isValidated[i - 1] = waste.isValidated;
            isPaid[i - 1] = waste.isPaid;
        }
    }

    // Fallback function to receive funds
    receive() external payable {}
}
