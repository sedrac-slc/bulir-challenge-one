import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionHistory } from './transaction_history.model';
import { Repository } from 'typeorm';
import { Job } from 'src/job/job.model';
import { Customer } from 'src/customer/customer.model';
import { CustomerService } from 'src/customer/customer.service';
import { JobService } from 'src/job/job.service';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectRepository(TransactionHistory)
    private readonly repository: Repository<TransactionHistory>,
    private readonly customerService: CustomerService,
    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,
  ) {}

  async findAll(): Promise<TransactionHistory[]> {
    return await this.repository.find();
  }

  async findAllCustomer(userId: string): Promise<TransactionHistory[]> {
    //const customer = await this.customerService.findById(id);
    return await this.repository.find({
      where: { customer: { id: userId } },
      relations: ['customer.user', 'job.provider.user'],
    });
  }

  async findAllJob(id: string): Promise<TransactionHistory[]> {
    const job = await this.jobService.findById(id);
    return await this.repository.find({ where: { job } });
  }

  async counterHistory(job: Job, customer: Customer): Promise<number> {
    const count = await this.repository.count({
      where: { job: job, customer: customer },
    });
    return count + 1;
  }

  async save(transaction: TransactionHistory): Promise<void> {
    transaction.counter = await this.counterHistory(
      transaction.job,
      transaction.customer,
    );
    await this.repository.save(transaction);
  }
}
