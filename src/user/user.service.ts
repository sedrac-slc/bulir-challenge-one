import { Injectable } from '@nestjs/common';
import { User, UserType } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  private readonly users: User[] = [
    {
      id: '0190dc57-38c8-7421-a8dd-72b71a36ea4d',
      fullName: 'Alice Smith',
      nif: '123456789',
      email: 'alice.smith@example.com',
      password: 'alicepassword123',
      type: UserType.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '0190dc57-9001-7fcd-a2cf-af381bb79d77',
      fullName: 'Bob Johnson',
      nif: '987654321',
      email: 'bob.johnson@example.com',
      password: 'bobpassword456',
      type: UserType.PROVIDER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '0190dc57-c895-75f7-a48d-40b9df9162c2',
      fullName: 'Charlie Brown',
      nif: '456789123',
      email: 'charlie.brown@example.com',
      password: 'charliepassword789',
      type: UserType.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
