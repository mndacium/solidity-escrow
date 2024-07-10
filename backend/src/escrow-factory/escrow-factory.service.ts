import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3';
import * as EscrowFactoryAbi from 'contracts/abis/EscrowFactory.abi.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EscrowFactoryService {
  constructor(
    private readonly web3Service: Web3Service,
    private readonly configService: ConfigService,
  ) {}

  web3 = this.web3Service.getWeb3();

  async createEscrow(
    buyer: string,
    seller: string,
    arbiter: string,
    contractAmount: number,
  ) {
    const factory = new this.web3.eth.Contract(
      EscrowFactoryAbi,
      this.configService.getOrThrow('ESCROW_FACTORY_ADDRESS'),
    );

    try {
      const gasEstimate = await factory.methods
        .createEscrow(buyer, seller, arbiter, contractAmount)
        .estimateGas({ from: '0x3bEd82dd1408393f439E282BA5F0985223eb2d7A' });

      const createEscrowTx = factory.methods.createEscrow(
        buyer,
        seller,
        arbiter,
        contractAmount,
      );

      const createTransaction = await this.web3.eth.accounts.signTransaction(
        {
          from: this.configService.getOrThrow('ARBITER_WALLET'),
          to: this.configService.getOrThrow('ESCROW_FACTORY_ADDRESS'),
          data: createEscrowTx.encodeABI(),
          gas: await createEscrowTx.estimateGas(),
          gasPrice: await this.web3.eth.getGasPrice(),
          nonce: await this.web3.eth.getTransactionCount(
            this.configService.getOrThrow('ARBITER_WALLET'),
          ),
        },
        this.configService.getOrThrow('ARBITER_PRIVATE_KEY'),
      );

      const createReceipt = await this.web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction,
      );
      console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
    } catch (err) {
      console.log(err);
    }
  }

  async getEscrows() {
    const factory = new this.web3.eth.Contract(
      EscrowFactoryAbi,
      this.configService.getOrThrow('ESCROW_FACTORY_ADDRESS'),
    );

    try {
      return await factory.methods.getEscrowContracts().call();
    } catch (err) {
      console.log(err);
    }
  }
}
