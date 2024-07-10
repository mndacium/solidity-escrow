import { Module } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';
import { Web3Service } from './web3.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'Web3',
      useFactory: (configService: ConfigService) => {
        return new Web3(configService.get('INFURA_URL'));
      },
      inject: [ConfigService],
    },
    {
      provide: 'Config',
      useFactory: (configService: ConfigService) => {
        return {
          wallet: configService.get('ARBITER_WALLET'),
          privateKey: configService.get('ARBITER_PRIVATE_KEY'),
        };
      },
      inject: [ConfigService],
    },
    Web3Service,
  ],
  exports: [Web3Service],
})
export class Web3Module {}
