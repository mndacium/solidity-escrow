import { Module } from '@nestjs/common';
import { Web3Module } from './web3';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Web3Module,
    WalletModule,
  ],
})
export class AppModule {}
