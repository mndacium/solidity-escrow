import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { EscrowService } from './escrow.service';
import { AddressParamDto, DepositRequestDto, SaleDetailsDto } from './dtos';
import { ContractNotFoundError } from './errors';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post(':address')
  async deposit(
    @Param() { address }: AddressParamDto,
    @Body() depositRequest: DepositRequestDto,
  ): Promise<string> {
    try {
      return await this.escrowService.deposit(depositRequest, address);
    } catch (error) {
      if (error instanceof ContractNotFoundError) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @Get(':address')
  async getSaleDetails(
    @Param() { address }: AddressParamDto,
  ): Promise<SaleDetailsDto> {
    try {
      return await this.escrowService.getSaleDetails(address);
    } catch (error) {
      if (error instanceof ContractNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
