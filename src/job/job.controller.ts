import {
  Body,
  Controller,
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

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @Roles(UserType.PROVIDER)
  async findAll() {
    return await this.jobService.findAll();
  }

  @Post()
  @Roles(UserType.PROVIDER)
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() req: Record<string, any>) {
    return await this.jobService.save(req);
  }

  @Put('/:id')
  @Roles(UserType.PROVIDER)
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() req: Record<string, any>) {
    return await this.jobService.update(id, req);
  }

  @Post('/hiring')
  @Roles(UserType.CUSTOMER)
  @HttpCode(HttpStatus.OK)
  async hiring(@Body() req: Record<string, any>) {
    return await this.jobService.hiring(req);
  }
}
