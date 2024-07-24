import { User } from 'src/user/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'TB_CUSTOMER' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @Column()
  balance: number;

  constructor(user: User, balance: number) {
    this.user = user;
    this.balance = balance;
  }
}
