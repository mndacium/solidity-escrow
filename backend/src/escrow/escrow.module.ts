import { Module } from '@nestjs/common';
import { EscrowService } from './escrow.service';
import { EscrowController } from './escrow.controller';
import { Web3Module } from 'src/web3';
import { EscrowFactoryModule } from 'src/escrow-factory';

@Module({
  imports: [Web3Module, EscrowFactoryModule],
  controllers: [EscrowController],
  providers: [EscrowService],
})
export class EscrowModule {}
