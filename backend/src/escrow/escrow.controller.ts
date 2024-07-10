import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EscrowService } from './escrow.service';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post(':address')
  deposit(
    @Param('address') address: string,
    @Body('buyer') buyer: string,
    @Body('contractAmount') amount: number,
  ) {
    return this.escrowService.deposit(buyer, address, amount);
  }

  @Get(':address')
  getSaleDetails(@Param('address') address: string) {
    return this.escrowService.getSaleDetails(address);
  }
}
