import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SetTransferRequestDto {
  @ApiProperty()
  @IsString()
  toWallet: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
