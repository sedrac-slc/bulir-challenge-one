import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Job } from './job.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderService } from 'src/provider/provider.service';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { TransactionHistoryService } from 'src/transaction_history/transaction_history.service';
import { TransactionHistory } from 'src/transaction_history/transaction_history.model';
import { JobDto, JobHiringDto } from './job.dto';
import { Provider } from 'src/provider/provider.model';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly repository: Repository<Job>,
    private readonly customerService: CustomerService,
    private readonly providerService: ProviderService,
    @Inject(forwardRef(() => TransactionHistoryService))
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  async requestValidate(req: JobDto) {
    const provider = await this.providerService.findById(req.provider);
    await this.throwNotFoundProvide(provider);
    return {
      provider,
      title: req.title,
      description: req.description,
      price: req.price,
    };
  }

  async findAll(): Promise<Job[]> {
    return await this.repository.find({ relations: ['provider.user'] });
  }

  async findAllContract(userId: string): Promise<Job[]> {
    const customer = await this.customerService.findByUser(userId);
    if (!customer) return [];
    return await this.repository.find({
      relations: ['provider.user'],
      where: {
        price: LessThanOrEqual(customer.balance),
      },
    });
  }

  async save(req: JobDto): Promise<Job> {
    try {
      const parm = await this.requestValidate(req);
      return await this.repository.save(
        new Job(parm.provider, parm.title, parm.description, parm.price),
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async update(id: string, req: JobDto): Promise<Job> {
    try {
      const job = await this.findById(id);
      if (!job) throw new ConflictException(`Job not found by id ${job.id}`);

      job.provider = (await this.requestValidate(req)).provider;
      job.title = req.title;
      job.description = req.description;
      job.price = req.price;

      return await this.repository.save(job);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async remove(id: string) {
    const job = await this.findById(id);
    await this.throwNotFoundJob(job);
    await this.repository.remove(job);
  }

  async findById(id: string): Promise<Job | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async hiring(req: JobHiringDto): Promise<void> {
    try {
      const job = await this.findById(req.job);
      await this.throwNotFoundJob(job);

      const customer = await this.customerService.findById(req.customer);
      if (!customer)
        throw new ConflictException(`Customer not found by id ${req.customer}`);

      if (job.price > customer.balance)
        throw new ConflictException('Insufficient balance');

      const valueInitial = customer.balance;
      customer.balance -= job.price;
      await this.customerService.createOrUpdate(customer);

      await this.transactionHistoryService.save(
        new TransactionHistory(
          job,
          customer,
          valueInitial,
          customer.balance,
          job.price,
        ),
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async throwNotFoundProvide(provider: Provider) {
    if (!provider)
      throw new ConflictException(`Provider not found by id ${provider.id}`);
  }

  async throwNotFoundJob(job: Job) {
    if (!job) throw new ConflictException(`Job not found by id ${job.id}`);
  }
}
