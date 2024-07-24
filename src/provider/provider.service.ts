import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './provider.model';
import { UserService } from 'src/user/user.service';
import { User, UserType } from 'src/user/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly repository: Repository<Provider>,
    private readonly userService: UserService,
  ) {}

  async findById(id: string): Promise<Provider | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async save(req: Record<string, any>): Promise<Provider> {
    try {
      const parm = this.userService.requestValidate(req);
      const user = await this.userService.save(
        new User(
          parm.fullName,
          parm.email,
          parm.nif,
          parm.password,
          UserType.PROVIDER,
        ),
      );
      return await this.repository.save(new Provider(user));
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
