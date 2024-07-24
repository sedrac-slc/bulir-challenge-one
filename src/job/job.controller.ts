import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() req: Record<string, any>) {
    return await this.jobService.save(req);
  }
}
