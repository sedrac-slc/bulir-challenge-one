import { forwardRef, Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.model';
import { ProviderModule } from 'src/provider/provider.module';
import { CustomerModule } from 'src/customer/customer.module';
import { TransactionHistoryModule } from 'src/transaction_history/transaction_history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    ProviderModule,
    CustomerModule,
    forwardRef(() => TransactionHistoryModule),
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
