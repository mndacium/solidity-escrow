import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EscrowService } from './escrow.service';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Get(':address')
  getSaleDetails(@Param('address') address: string) {
    return this.escrowService.getSaleDetails(address);
  }
}
