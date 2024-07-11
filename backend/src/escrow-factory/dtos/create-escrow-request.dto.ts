import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateEscrowRequestDto {
  @ApiProperty()
  @IsString()
  buyer: string;

  @ApiProperty()
  @IsString()
  seller: string;

  @ApiProperty()
  @IsString()
  arbiter: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
