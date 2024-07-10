// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract EscrowFactory {
    address[] public escrowContracts;

    function createEscrow(
        address payable _buyer,
        address payable _seller,
        address _arbiter,
        uint _contractAmount
    ) public {
        address newEscrow = address(
            new Escrow(_buyer, _seller, _arbiter, _contractAmount)
        );
        escrowContracts.push(newEscrow);
    }

    function getEscrowContracts() public view returns (address[] memory) {
        return escrowContracts;
    }
}

contract Escrow {
    enum State {
        AWAITING_PAYMENT,
        AWAITING_DELIVERY,
        COMPLETE_DELIVERY,
        COMPLETE_SALE,
        CANCELED_SALE
    }

    address payable public buyer;
    address payable public seller;
    address public arbiter;
    uint public contractAmount;
    State public currentState;

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this method");
        _;
    }

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can call this method");
        _;
    }

    constructor(
        address payable _buyer,
        address payable _seller,
        address _arbiter,
        uint _contractAmount
    ) {
        buyer = _buyer;
        seller = _seller;
        arbiter = _arbiter;
        contractAmount = _contractAmount;
        currentState = State.AWAITING_PAYMENT;
    }

    function deposit() external payable onlyBuyer {
        require(
            currentState == State.AWAITING_PAYMENT,
            "The deal is in the incorrect state"
        );
        require(
            msg.value == contractAmount,
            "The amount sent is not equal to the amount of the contract"
        );
        currentState = State.AWAITING_DELIVERY;
    }

    function confirmDelivery() external onlyBuyer {
        require(
            currentState == State.AWAITING_DELIVERY,
            "The deal is in the incorrect state"
        );
        currentState = State.COMPLETE_DELIVERY;
    }

    function completeSale() external onlyArbiter {
        require(
            currentState == State.COMPLETE_DELIVERY,
            "The deal is in the incorrect state"
        );
        sendEth(seller, contractAmount);
        currentState = State.COMPLETE_SALE;
    }

    function refundBuyer() external onlyArbiter {
        require(
            currentState == State.AWAITING_DELIVERY ||
                currentState == State.COMPLETE_DELIVERY,
            "The deal is in the incorrect state"
        );
        require(contractAmount > 0);
        sendEth(buyer, contractAmount);
        currentState = State.CANCELED_SALE;
    }

    function getSaleDetails()
        external
        view
        returns (address payable, address payable, address, uint, State)
    {
        return (buyer, seller, arbiter, contractAmount, currentState);
    }

    function sendEth(address payable _to, uint _amount) private {
        (bool success, ) = address(_to).call{value: _amount}("");
        require(success, "Failed to send Ether");
    }
}
