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
