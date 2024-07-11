import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { RequestWithUserDto } from './request-with-user.dto';

export class DepositRequestDto extends RequestWithUserDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
