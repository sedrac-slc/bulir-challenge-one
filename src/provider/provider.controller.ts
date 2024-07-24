import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProviderService } from './provider.service';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() req: Record<string, any>) {
    return await this.providerService.save(req);
  }
}
