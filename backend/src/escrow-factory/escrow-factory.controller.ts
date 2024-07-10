import { Body, Controller, Get, Post } from '@nestjs/common';
import { EscrowFactoryService } from './escrow-factory.service';

@Controller('escrow-factory')
export class EscrowFactoryController {
  constructor(private readonly escrowFactoryService: EscrowFactoryService) {}

  @Post()
  createEscrow(
    @Body('buyer') buyer: string,
    @Body('seller') seller: string,
    @Body('arbiter') arbiter: string,
    @Body('contractAmount') contractAmount: number,
  ) {
    return this.escrowFactoryService.createEscrow(
      buyer,
      seller,
      arbiter,
      contractAmount,
    );
  }

  @Get()
  getEscrows() {
    return this.escrowFactoryService.getEscrows();
  }
}
