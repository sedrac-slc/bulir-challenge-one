import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Job } from './job.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderService } from 'src/provider/provider.service';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { TransactionHistoryService } from 'src/transaction_history/transaction_history.service';
import { TransactionHistory } from 'src/transaction_history/transaction_history.model';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly repository: Repository<Job>,
    private readonly customerService: CustomerService,
    private readonly providerService: ProviderService,
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  async requestValidate(req: Record<string, any>) {
    if (!req.provider || !req.title || !req.description || !req.price)
      throw new BadRequestException('Missing required fields');
    const provider = await this.providerService.findById(req.provider);
    if (!provider)
      throw new ConflictException(`Provider not found by id ${req.provider}`);
    return {
      provider,
      title: req.title,
      description: req.description,
      price: req.price,
    };
  }

  async requestValidateUpate(req: Record<string, any>) {
    if (!req.title || !req.description || !req.price)
      throw new BadRequestException('Missing required fields');

    return {
      title: req.title,
      description: req.description,
      price: req.price,
    };
  }

  async findAll(): Promise<Job[]> {
    return await this.repository.find({ relations: ['provider.user'] });
  }

  async save(req: Record<string, any>): Promise<Job> {
    try {
      const parm = await this.requestValidate(req);
      return await this.repository.save(
        new Job(parm.provider, parm.title, parm.description, parm.price),
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async update(id: string, req: Record<string, any>): Promise<Job> {
    try {
      const job = await this.findById(id);
      if (!job) throw new ConflictException(`Job not found by id ${job.id}`);
      const parm = await this.requestValidateUpate(req);

      job.title = parm.title;
      job.description = parm.description;
      job.price = parm.price;

      return await this.repository.save(job);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async findById(id: string): Promise<Job | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async hiring(req: Record<string, any>): Promise<void> {
    try {
      if (!req.job || !req.curstomer)
        throw new BadRequestException('Missing required fields');

      const job = await this.findById(req.job);
      if (!job) throw new ConflictException(`Job not found by id ${req.job}`);

      const customer = await this.customerService.findById(req.curstomer);
      if (!customer)
        throw new ConflictException(`Customer not found by id ${req.customer}`);

      if (job.price > customer.balance)
        throw new ConflictException('Insufficient balance');

      const valueInitial = customer.balance;
      customer.balance -= valueInitial;
      await this.customerService.createOrUpdate(customer);

      await this.transactionHistoryService.save(
        new TransactionHistory(job, customer, valueInitial, customer.balance),
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
