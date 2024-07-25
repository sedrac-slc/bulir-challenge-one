import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({
    description: 'Nome completo cliente',
    example: 'Sedrac Lucas Calupeteca',
  })
  fullName: string;
  @ApiProperty({
    description: 'Email do cliente',
    example: 'slcsedrac@gmail.com',
  })
  email: string;
  @ApiProperty({ description: 'NIF do cliente', example: '006351234LA098' })
  nif: string;
  @ApiProperty({ description: 'Senha do cliente', example: '12345678' })
  password: string;
  @ApiProperty({ description: 'Saldo do cliente', example: 200 })
  balance: number = 0;
}
