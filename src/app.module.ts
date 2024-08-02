import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configMySQL as config } from 'orem-config';
import { CustomerModule } from './customer/customer.module';
import { JobModule } from './job/job.module';
import { ProviderModule } from './provider/provider.module';
import { TransactionHistoryModule } from './transaction_history/transaction_history.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    JwtModule,
    UserModule,
    AuthModule,
    CustomerModule,
    JobModule,
    ProviderModule,
    TransactionHistoryModule,
    RegisterModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
