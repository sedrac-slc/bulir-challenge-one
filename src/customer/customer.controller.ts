import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.customerService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() req: Record<string, any>) {
    return await this.customerService.save(req);
  }
}
