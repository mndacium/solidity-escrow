import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EscrowService } from './escrow.service';
import { DepositRequestDto, SaleDetailsDto } from './dtos';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post(':address')
  deposit(
    @Param('address') address: string,
    @Body() depositRequest: DepositRequestDto,
  ): Promise<string> {
    return this.escrowService.deposit(depositRequest, address);
  }

  @Get(':address')
  getSaleDetails(@Param('address') address: string): Promise<SaleDetailsDto> {
    return this.escrowService.getSaleDetails(address);
  }
}
