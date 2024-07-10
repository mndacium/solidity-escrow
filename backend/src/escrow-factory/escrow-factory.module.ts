import { Module } from '@nestjs/common';
import { EscrowFactoryService } from './escrow-factory.service';
import { EscrowFactoryController } from './escrow-factory.controller';
import { Web3Module } from 'src/web3';

@Module({
  imports: [Web3Module],
  controllers: [EscrowFactoryController],
  providers: [EscrowFactoryService],
  exports: [EscrowFactoryService],
})
export class EscrowFactoryModule {}
