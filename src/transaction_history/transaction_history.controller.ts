import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TransactionHistoryService } from './transaction_history.service';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.transactionHistoryService.findAll();
  }

  @Get('/:id/customer')
  @HttpCode(HttpStatus.OK)
  async findAllCustomer(@Param('id') id: string) {
    return await this.transactionHistoryService.findAllCustomer(id);
  }

  @Get('/:id/job')
  @HttpCode(HttpStatus.OK)
  async findAllJob(@Param('id') id: string) {
    return await this.transactionHistoryService.findAllJob(id);
  }
}
