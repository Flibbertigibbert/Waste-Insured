// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


//A WasteManagement contract that allows a collector to assign producers who bring waste 
//The assign producers record waste information. 
//he waste information is validated by the collector,
// and payment is made to the producer based on the weight of the waste



contract WasteManagement {
    struct Waste {
        address payable producer;
        string wasteType;
        string collectionLocation;
        uint256 weight;
        bool isRecorded;
        bool isValidated;
        bool isPaid;
    }

    mapping(uint256 => Waste) public wasteRecords;
    uint256 public wasteCounter;

    address payable public collector;
    mapping(address => bool) public assignedProducers;

    event WasteRecorded(uint256 indexed wasteId, address indexed producer, string wasteType, string collectionLocation, uint256 weight);
    event WasteValidated(uint256 indexed wasteId, address indexed collector);
    event PaymentSent(address indexed producer, uint256 amount);
    event FundsWithdrawn(address indexed collector, uint256 amount);
    event FundsDeposited(address indexed collector, uint256 amount);

    modifier onlyProducer() {
        require(assignedProducers[msg.sender], "Only the assigned producer can perform this action");
        _;
    }

    modifier onlyCollector() {
        require(msg.sender == collector, "Only the collector can perform this action");
        _;
    }

    constructor() payable {
        collector = payable(msg.sender);
    }

    function assignProducer(address payable _producer) public onlyCollector {
        require(_producer != address(0), "Invalid producer address");

        assignedProducers[_producer] = true;
    }

    function recordWaste(string memory _wasteType, string memory _collectionLocation, uint256 _weight) public onlyProducer {
        wasteCounter++;
        wasteRecords[wasteCounter] = Waste(payable(msg.sender), _wasteType, _collectionLocation, _weight, true, false, false);

        emit WasteRecorded(wasteCounter, msg.sender, _wasteType, _collectionLocation, _weight);
    }

    function validateWaste(uint256 _wasteId) public onlyCollector {
        require(_wasteId <= wasteCounter, "Invalid waste ID");
        require(wasteRecords[_wasteId].isRecorded, "Waste is not yet recorded");
        require(!wasteRecords[_wasteId].isValidated, "Waste is already validated");

        wasteRecords[_wasteId].isValidated = true;

        emit WasteValidated(_wasteId, msg.sender);
    }

    function sendPayment(uint256 _wasteId) public onlyCollector {
        require(_wasteId <= wasteCounter, "Invalid waste ID");
        require(wasteRecords[_wasteId].isRecorded, "Waste is not yet recorded");
        require(wasteRecords[_wasteId].isValidated, "Waste is not yet validated");
        require(!wasteRecords[_wasteId].isPaid, "Payment already sent for this waste");

        uint256 paymentAmount = (wasteRecords[_wasteId].weight * 1 ether) / 40; // Calculate payment amount based on weight and rate (40 weight units per 1 Ether)

        require(address(this).balance >= paymentAmount, "Insufficient contract balance");

        wasteRecords[_wasteId].isPaid = true; // Mark the waste as paid before transferring the payment
        emit PaymentSent(wasteRecords[_wasteId].producer, paymentAmount);

        bool transferSuccess = transferPayment(wasteRecords[_wasteId].producer, paymentAmount);
        require(transferSuccess, "Payment transfer failed");
    }

    function withdrawFunds(uint256 _amount) public onlyCollector {
    uint256 withdrawalAmount = _amount * 1 ether; // Convert the amount from Ether to wei

    require(withdrawalAmount <= address(this).balance, "Insufficient contract balance");
    collector.transfer(withdrawalAmount);
    emit FundsWithdrawn(collector, withdrawalAmount);
    }


    function depositFunds() public payable onlyCollector {
        emit FundsDeposited(collector, msg.value);
    }

    function transferPayment(address payable _recipient, uint256 _amount) internal returns (bool) {
        (bool success, ) = _recipient.call{value: _amount}("");
        return success;
    }

    receive() external payable {}
}
