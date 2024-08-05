import { ConflictException, Injectable } from '@nestjs/common';
import { Customer } from './customer.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User, UserType } from 'src/user/user.model';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.repository.find({ relations: ['user'] });
  }

  async save(req: CustomerDto): Promise<Customer> {
    try {
      const user = await this.userService.save(
        new User(
          req.fullName,
          req.nif,
          req.email,
          req.password,
          UserType.CUSTOMER,
        ),
      );
      return await this.createOrUpdate(new Customer(user, req.balance));
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async update(id: string, req: CustomerDto): Promise<Customer> {
    try {
      const customer = await this.findById(id);
      await this.throwNotFoundCustomer(customer);
      customer.user.fullName = req.fullName;
      customer.user.email = req.email;
      customer.user.nif = req.nif;
      customer.balance = req.balance;
      await this.userService.save(customer.user, id);
      return await this.repository.save(customer);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async remove(id: string) {
    const customer = await this.findById(id);
    await this.throwNotFoundCustomer(customer);
    await this.repository.remove(customer);
  }

  async findById(id: string): Promise<Customer | undefined> {
    return await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findByUser(userId: string): Promise<Customer | undefined> {
    return await this.repository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async createOrUpdate(curstomer: Customer): Promise<Customer> {
    return await this.repository.save(curstomer);
  }

  async throwNotFoundCustomer(customer: Customer) {
    if (!customer)
      throw new ConflictException(`Customer not found by id ${customer.id}`);
  }
}
