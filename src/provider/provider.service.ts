import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './provider.model';
import { UserService } from 'src/user/user.service';
import { User, UserType } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { ProviderDto } from './provider.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly repository: Repository<Provider>,
    private readonly userService: UserService,
  ) {}

  async findById(id: string): Promise<Provider | undefined> {
    return await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findAll(): Promise<Provider[]> {
    return await this.repository.find({ relations: ['user'] });
  }

  async save(req: ProviderDto): Promise<Provider> {
    try {
      const user = await this.userService.save(
        new User(
          req.fullName,
          req.nif,
          req.email,
          req.password,
          UserType.PROVIDER,
        ),
      );
      return await this.repository.save(new Provider(user));
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async update(id: string, req: ProviderDto): Promise<Provider> {
    try {
      const provider = await this.findById(id);
      await this.throwNotFoundProvider(provider);
      provider.user.fullName = req.fullName;
      provider.user.email = req.email;
      provider.user.nif = req.nif;
      await this.userService.save(provider.user);
      return await provider;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async remove(id: string) {
    const provider = await this.findById(id);
    await this.throwNotFoundProvider(provider);
    await this.repository.remove(provider);
  }

  async throwNotFoundProvider(provider: Provider) {
    if (!provider)
      throw new ConflictException(`Provider not found by id ${provider.id}`);
  }
}
