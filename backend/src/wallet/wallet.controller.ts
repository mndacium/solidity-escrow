import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { SetTransferRequestDto } from './dtos';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  getBalance() {
    return this.walletService.getBalance();
  }

  @Post()
  setTransfer(@Body() setTransferRequest: SetTransferRequestDto) {
    return this.walletService.setTransfer(setTransferRequest);
  }
}
