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
import { JobService } from './job.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/user.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JobDto, JobHiringDto } from './job.dto';

@ApiTags('Serviços')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @Roles(UserType.PROVIDER)
  @ApiOperation({ summary: 'Listar todos serviços' })
  async findAll() {
    return await this.jobService.findAll();
  }

  @Get('/:id')
  @Roles(UserType.PROVIDER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar pelo serviço' })
  async findById(@Param('id') id: string) {
    return await this.jobService.findById(id);
  }

  @Post()
  @Roles(UserType.PROVIDER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um serviço' })
  async save(@Body() req: JobDto) {
    return await this.jobService.save(req);
  }

  @Put('/:id')
  @Roles(UserType.PROVIDER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Editar um serviço' })
  async update(@Param('id') id: string, @Body() req: JobDto) {
    return await this.jobService.update(id, req);
  }

  @Delete('/:id')
  @Roles(UserType.PROVIDER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar um serviço' })
  async remove(@Param('id') id: string) {
    return await this.jobService.remove(id);
  }

  @Post('/hiring')
  @Roles(UserType.CUSTOMER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fazer a contratação de um serviço' })
  async hiring(@Body() req: JobHiringDto) {
    return await this.jobService.hiring(req);
  }
}
