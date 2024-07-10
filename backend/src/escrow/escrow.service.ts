import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3';
import * as EscrowAbi from 'contracts/abis/Escrow.abi.json';
import { ConfigService } from '@nestjs/config';
import { EscrowFactoryService } from 'src/escrow-factory/escrow-factory.service';
import { JSONParseBigInt } from 'src/utils';

@Injectable()
export class EscrowService {
  constructor(
    private readonly web3Service: Web3Service,
    private readonly configService: ConfigService,
    private readonly escrowFactoryService: EscrowFactoryService,
  ) {}

  web3 = this.web3Service.getWeb3();

  async deposit(buyer: string, escrowAddress: string, amount: number) {
    try {
      const escrow = await this.getEscrowContract(escrowAddress);

      const depositTx = await escrow.methods.deposit();

      console.log(amount);

      const depositTransaction = await this.web3.eth.accounts.signTransaction(
        {
          from: buyer,
          to: escrowAddress,
          data: depositTx.encodeABI(),
          value: amount,
          gas: await depositTx.estimateGas({
            from: buyer,
            value: this.web3.utils.toHex(amount),
          }),
          gasPrice: await this.web3.eth.getGasPrice(),
          nonce: await this.web3.eth.getTransactionCount(buyer),
        },
        this.configService.getOrThrow('BUYER_PRIVATE_KEY'),
      );

      const depositReceipt = await this.web3.eth.sendSignedTransaction(
        depositTransaction.rawTransaction,
      );
      console.log(`Tx successful with hash: ${depositReceipt.transactionHash}`);
    } catch (err) {
      console.log(err);
    }
  }

  async getSaleDetails(escrowAddress: string) {
    try {
      const escrow = await this.getEscrowContract(escrowAddress);

      const saleDetails: any = await escrow.methods.getSaleDetails().call();

      return JSONParseBigInt(saleDetails);
    } catch (err) {
      console.log(err);
    }
  }

  private async getEscrowContract(address: string) {
    const escrowContracts = await this.escrowFactoryService.getEscrows();

    if (!escrowContracts.includes(address)) {
      throw Error('Contract not found');
    }

    return new this.web3.eth.Contract(EscrowAbi, address);
  }
}
