import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNumber, IsPositive } from 'class-validator';

export class SetTransferRequestDto {
  @ApiProperty()
  @IsEthereumAddress()
  toWallet: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
