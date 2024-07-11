import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { EscrowService } from './escrow.service';
import {
  AddressParamDto,
  DepositRequestDto,
  RequestWithUserDto,
  SaleDetailsDto,
} from './dtos';
import { ContractNotFoundError } from './errors';
import { ApiParam } from '@nestjs/swagger';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @ApiParam({ name: 'address' })
  @Post(':address/deposit')
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

      throw error;
    }
  }

  @ApiParam({ name: 'address' })
  @Post(':address/confirm-delivery')
  async confirmDelivery(
    @Param() { address }: AddressParamDto,
    @Body() confirmDeliveryRequest: RequestWithUserDto,
  ): Promise<string> {
    try {
      return await this.escrowService.confirmDelivery(
        confirmDeliveryRequest,
        address,
      );
    } catch (error) {
      if (error instanceof ContractNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @ApiParam({ name: 'address' })
  @Post(':address/complete-sale')
  async completeSale(
    @Param() { address }: AddressParamDto,
    @Body() completeSaleRequest: RequestWithUserDto,
  ): Promise<string> {
    try {
      return await this.escrowService.completeSale(
        completeSaleRequest,
        address,
      );
    } catch (error) {
      if (error instanceof ContractNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @ApiParam({ name: 'address' })
  @Post(':address/refund-buyer')
  async refundBuyer(
    @Param() { address }: AddressParamDto,
    @Body() refundBuyerRequest: RequestWithUserDto,
  ): Promise<string> {
    try {
      return await this.escrowService.refundBuyer(refundBuyerRequest, address);
    } catch (error) {
      if (error instanceof ContractNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @ApiParam({ name: 'address' })
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
