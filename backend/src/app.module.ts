import { Module } from '@nestjs/common';
import { Web3Module } from './web3';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet';
import { EscrowFactoryModule } from './escrow-factory';
import { EscrowModule } from './escrow';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EscrowModule,
    EscrowFactoryModule,
    Web3Module,
    WalletModule,
  ],
})
export class AppModule {}
