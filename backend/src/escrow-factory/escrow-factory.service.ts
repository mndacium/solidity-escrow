import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3';
import * as EscrowFactoryAbi from 'contracts/abis/EscrowFactory.abi.json';
import { ConfigService } from '@nestjs/config';
import { CreateEscrowRequestDto } from './dtos';

@Injectable()
export class EscrowFactoryService {
  constructor(
    private readonly web3Service: Web3Service,
    private readonly configService: ConfigService,
  ) {}

  web3 = this.web3Service.getWeb3();

  async createEscrow({
    buyer,
    seller,
    arbiter,
    amount,
  }: CreateEscrowRequestDto) {
    const factory = new this.web3.eth.Contract(
      EscrowFactoryAbi,
      this.configService.getOrThrow('ESCROW_FACTORY_ADDRESS'),
    );

    const createEscrowTx = factory.methods.createEscrow(
      buyer,
      seller,
      arbiter,
      amount,
    );

    const createTransaction = await this.web3.eth.accounts.signTransaction(
      {
        from: arbiter,
        to: this.configService.getOrThrow('ESCROW_FACTORY_ADDRESS'),
        data: createEscrowTx.encodeABI(),
        gas: await createEscrowTx.estimateGas(),
        gasPrice: await this.web3.eth.getGasPrice(),
        nonce: await this.web3.eth.getTransactionCount(arbiter),
      },
      this.configService.getOrThrow('ARBITER_PRIVATE_KEY'),
    );

    const createReceipt = await this.web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction,
    );

    return createReceipt.transactionHash.toString();
  }

  async getEscrows(): Promise<string[]> {
    const factory = new this.web3.eth.Contract(
      EscrowFactoryAbi,
      this.configService.getOrThrow('ESCROW_FACTORY_ADDRESS'),
    );

    return await factory.methods.getEscrowContracts().call();
  }
}
