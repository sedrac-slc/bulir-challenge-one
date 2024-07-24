import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async save(user: User) {
    const findNif = await this.findByNif(user.nif);
    const findEmail = await this.findByEmail(user.email);

    if (findNif)
      throw new ConflictException(`NIF ${user.nif} already registered`);
    if (findEmail)
      throw new ConflictException(`Email ${user.email} already registered`);

    user.password = hashSync(user.password, 10);
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByNif(nif: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { nif } });
  }
}
