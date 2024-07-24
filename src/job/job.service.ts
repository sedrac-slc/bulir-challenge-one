import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Job } from './job.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderService } from 'src/provider/provider.service';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly repository: Repository<Job>,
    private readonly providerService: ProviderService,
  ) {}

  async requestValidate(req: Record<string, any>) {
    if (!req.provider || !req.title || !req.description || !req.price)
      throw new BadRequestException('Missing required fields');
    const provider = await this.providerService.findById(req.provider);
    if (!provider)
      throw new ConflictException(`Provider not found by id ${req.provider}`);
    return {
      provider,
      title: req.title,
      description: req.description,
      price: req.price,
    };
  }

  async save(req: Record<string, any>): Promise<Job> {
    try {
      const parm = await this.requestValidate(req);
      return await this.repository.save(
        new Job(parm.provider, parm.title, parm.description, parm.price),
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
