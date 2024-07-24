import {
  Column,
  CreateDateColumn,
  Entity,
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
}
