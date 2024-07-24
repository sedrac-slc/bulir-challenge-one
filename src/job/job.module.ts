import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.model';
import { ProviderModule } from 'src/provider/provider.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), ProviderModule],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
