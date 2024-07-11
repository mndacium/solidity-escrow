import { IsEthereumAddress } from 'class-validator';

export class AddressParamDto {
  @IsEthereumAddress()
  address: string;
}
