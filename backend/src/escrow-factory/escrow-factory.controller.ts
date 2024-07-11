import { Body, Controller, Get, Post } from '@nestjs/common';
import { EscrowFactoryService } from './escrow-factory.service';
import { CreateEscrowRequestDto } from './dtos';

@Controller('escrow-factory')
export class EscrowFactoryController {
  constructor(private readonly escrowFactoryService: EscrowFactoryService) {}

  @Post()
  createEscrow(
    @Body() createEscrowRequest: CreateEscrowRequestDto,
  ): Promise<string> {
    return this.escrowFactoryService.createEscrow(createEscrowRequest);
  }

  @Get()
  getEscrows(): Promise<string[]> {
    return this.escrowFactoryService.getEscrows();
  }
}
