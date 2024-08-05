import { Customer } from 'src/customer/customer.model';
import { UserResponse } from 'src/response/UserResponse';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  PROVIDER = 'PROVIDER',
}

@Entity({ name: 'TB_USERS' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fullName: string;
  @Column({ unique: true })
  nif: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  type: UserType;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user, { cascade: true })
  @JoinColumn()
  customer: Customer;

  constructor(
    fullName: string,
    nif: string,
    email: string,
    password: string,
    type: UserType,
  ) {
    this.fullName = fullName;
    this.nif = nif;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  userResponse(balance: number = 0): UserResponse {
    return new UserResponse(
      this.id,
      this.fullName,
      this.nif,
      this.email,
      this.type,
      balance,
    );
  }
}
