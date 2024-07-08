import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Web3Module } from 'src/web3';

@Module({
  imports: [Web3Module],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
