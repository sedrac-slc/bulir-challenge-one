import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Email do cliente',
    example: 'slcsedrac@gmail.com',
  })
  email: string;
  @ApiProperty({ description: 'Senha do cliente', example: '12345678' })
  password: string;
}

export interface TokenDto {
  token: string;
}
