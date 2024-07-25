import { forwardRef, Module } from '@nestjs/common';
import { TransactionHistoryService } from './transaction_history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionHistory } from './transaction_history.model';
import { TransactionHistoryController } from './transaction_history.controller';
import { JobModule } from 'src/job/job.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionHistory]),
    CustomerModule,
    forwardRef(() => JobModule),
  ],
  providers: [TransactionHistoryService],
  exports: [TransactionHistoryService],
  controllers: [TransactionHistoryController],
})
export class TransactionHistoryModule {}
