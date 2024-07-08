import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3';

@Injectable()
export class WalletService {
  constructor(private readonly web3Service: Web3Service) {}

  async getBalance() {
    return this.web3Service.balance();
  }

  async setTransfer(toWallet: string, value: number) {
    return this.web3Service.transfer(toWallet, value);
  }
}
