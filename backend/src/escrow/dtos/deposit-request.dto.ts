import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DepositRequestDto {
  @ApiProperty()
  @IsString()
  buyer: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
