## Escrow contract
### Example:
https://sepolia.etherscan.io/address/0x2a373fb08b98e8b2849982f523b8f6bf29ca43c3
- deposit (onlyBuyer): Allows the buyer to deposit funds to the contract.
- confirmDelivery (onlyBuyer): Signals the buyer's confirmation of receiving goods or services.
- completeSale (onlyArbiter): Transfers funds to the seller after confirmation of delivery.
- refundBuyer (onlyArbiter): Refunds deposited funds to the buyer if there's a dispute or delivery hasn't occurred.
- getSaleDetails: Provides details of the escrow agreement for all parties involved.



## Escrow factory contract
### Example:
https://sepolia.etherscan.io/address/0x6d4a3574fba2a03f5c5303fddceab8730f9bca85
- createEscrow: Allows users to initiate a new escrow agreement. It takes details like buyer, seller, arbiter, and contract amount as input and deploys a new Escrow contract instance on the blockchain.
- getEscrowContracts:  Retrieves a list of all deployed escrow contract addresses from the factory's storage.
