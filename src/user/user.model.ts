import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserType {
  CUSTOMER,
  PROVIDER,
}

@Entity({ name: 'TB_USERS' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fullName: string;
  @Column()
  @Index({ unique: true })
  nif: string;
  @Column()
  @Index({ unique: true })
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
    id: string,
    fullName: string,
    nif: string,
    email: string,
    password: string,
    type: UserType,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.nif = nif;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
