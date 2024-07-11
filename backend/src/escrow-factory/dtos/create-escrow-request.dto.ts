import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNumber, IsPositive } from 'class-validator';

export class CreateEscrowRequestDto {
  @ApiProperty()
  @IsEthereumAddress()
  buyer: string;

  @ApiProperty()
  @IsEthereumAddress()
  seller: string;

  @ApiProperty()
  @IsEthereumAddress()
  arbiter: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
