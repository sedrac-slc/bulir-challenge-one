import { ApiProperty } from '@nestjs/swagger';

export class JobDto {
  @ApiProperty({ description: 'Nome serviço', example: 'Lavador de carro' })
  title: string;
  @ApiProperty({
    description: 'Descrição',
    example: 'Faço a lavagem de carros pesados e ligeiro',
  })
  description: string;
  @ApiProperty({ description: 'O valor do serviço', example: 5000 })
  price: number;
  @ApiProperty({
    description: 'Informa o id do provedor',
    example: 'cc6dd6f1-81e8-45bb-989b-b375fc339979',
  })
  provider: string;
}

export class JobHiringDto {
  @ApiProperty({
    description: 'Informa o id do serviço',
    example: 'f6634bf7-3d05-4423-a665-a627d84e3f4c',
  })
  job: string;
  @ApiProperty({
    description: 'Informa o id do cliente',
    example: 'cc6dd6f1-81e8-45bb-989b-b375fc339979',
  })
  customer: string;
}
