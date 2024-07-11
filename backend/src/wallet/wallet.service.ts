import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3';
import { SetTransferRequestDto } from './dtos';

@Injectable()
export class WalletService {
  constructor(private readonly web3Service: Web3Service) {}

  async getBalance() {
    return this.web3Service.balance();
  }

  async setTransfer({ toWallet, amount }: SetTransferRequestDto) {
    await this.web3Service.transfer(toWallet, amount);
  }
}
