import { Provider } from 'src/provider/provider.model';
import { TransactionHistory } from 'src/transaction_history/transaction_history.model';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'TB_JOB' })
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Provider, (provider) => provider.jobs)
  provider: Provider;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', unsigned: true })
  price: number;

  @OneToMany(() => TransactionHistory, (t) => t.job)
  transactionHistories: TransactionHistory[];

  constructor(
    provider: Provider,
    title: string,
    description: string,
    price: number,
  ) {
    this.provider = provider;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
