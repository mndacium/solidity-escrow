import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNumber, IsPositive } from 'class-validator';

export class RequestWithUserDto {
  @ApiProperty()
  @IsEthereumAddress()
  userAddress: string;
}
