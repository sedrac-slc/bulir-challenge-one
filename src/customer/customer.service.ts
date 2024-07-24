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
      return await this.repository.save(new Customer(user, parm.balance));
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
