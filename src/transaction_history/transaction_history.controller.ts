import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { TransactionHistoryService } from './transaction_history.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Transações')
@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar todas transações feitas' })
  async findAll() {
    return await this.transactionHistoryService.findAll();
  }

  @Get('/:id/customer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar as transações de um cliente' })
  async findAllCustomer(@Param('id') id: string) {
    return await this.transactionHistoryService.findAllCustomer(id);
  }

  @Get('/:id/provider')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar as transações de um cliente' })
  async findAllProvider(@Param('id') id: string) {
    return await this.transactionHistoryService.findAllProvider(id);
  }

  @Get('/:id/job')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar as transações de um serviço' })
  async findAllJob(@Param('id') id: string) {
    return await this.transactionHistoryService.findAllJob(id);
  }
}
