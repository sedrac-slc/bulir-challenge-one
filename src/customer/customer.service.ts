import { ConflictException, Injectable } from '@nestjs/common';
import { Customer } from './customer.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User, UserType } from 'src/user/user.model';

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

  async save(req: Record<string, any>): Promise<Customer> {
    try {
      const parm = this.userService.requestValidate(req);
      const user = await this.userService.save(
        new User(
          parm.fullName,
          parm.email,
          parm.nif,
          parm.password,
          UserType.CUSTOMER,
        ),
      );
      return await this.createOrUpdate(new Customer(user, parm.balance));
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async findById(id: string): Promise<Customer | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async createOrUpdate(curstomer: Customer): Promise<Customer> {
    return await this.repository.save(curstomer);
  }
}
