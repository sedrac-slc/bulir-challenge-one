import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerDto } from './customer.dto';

@ApiTags('Clientes')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos cliente' })
  async findAll() {
    return await this.customerService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar o cliente' })
  async findById(@Param('id') id: string) {
    return await this.customerService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um cliente' })
  async save(@Body() req: CustomerDto) {
    return await this.customerService.save(req);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Editar um cliente' })
  async update(@Param('id') id: string, @Body() req: CustomerDto) {
    return await this.customerService.update(id, req);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar um cliente' })
  async remove(@Param('id') id: string) {
    return await this.customerService.remove(id);
  }
}
