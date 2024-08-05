import { TransactionHistory } from 'src/transaction_history/transaction_history.model';
import { User } from 'src/user/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'TB_CUSTOMER' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.customer, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'decimal', unsigned: true })
  balance: number;

  @OneToMany(() => TransactionHistory, (t) => t.customer)
  transactionHistories: TransactionHistory[];

  constructor(user: User, balance: number) {
    this.user = user;
    this.balance = balance;
  }
}
