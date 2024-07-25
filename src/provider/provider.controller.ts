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
import { ProviderService } from './provider.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProviderDto } from './provider.dto';

@ApiTags('Prestador')
@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos prestadores' })
  async findAll() {
    return await this.providerService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar o prestador' })
  async findById(@Param('id') id: string) {
    return await this.providerService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Buscar o prestador' })
  async save(@Body() req: ProviderDto) {
    return await this.providerService.save(req);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Editar um prestador' })
  async update(@Param('id') id: string, @Body() req: ProviderDto) {
    return await this.providerService.update(id, req);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar um prestador' })
  async remove(@Param('id') id: string) {
    return await this.providerService.remove(id);
  }
}
