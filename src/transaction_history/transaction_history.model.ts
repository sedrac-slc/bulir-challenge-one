import { Customer } from 'src/customer/customer.model';
import { Job } from 'src/job/job.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'TB_TRANSACTION_HISTORY' })
export class TransactionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, (job) => job.transactionHistories, { eager: true })
  job: Job;

  @ManyToOne(() => Customer, (customer) => customer.transactionHistories, {
    eager: true,
  })
  customer: Customer;

  @Column({ type: 'decimal', unsigned: true })
  valueInitial: number;

  @Column({ type: 'decimal', unsigned: true })
  valueFinal: number;

  @Column({ unsigned: true })
  counter?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(
    job: Job,
    customer: Customer,
    valueInitial: number,
    valueFinal: number,
  ) {
    this.customer = customer;
    this.job = job;
    this.valueInitial = valueInitial;
    this.valueFinal = valueFinal;
    this.counter = 0;
  }
}
