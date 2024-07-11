import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNumber, IsPositive } from 'class-validator';

export class DepositRequestDto {
  @ApiProperty()
  @IsEthereumAddress()
  buyer: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
