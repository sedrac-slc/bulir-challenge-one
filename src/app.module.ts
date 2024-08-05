import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { JobModule } from './job/job.module';
import { ProviderModule } from './provider/provider.module';
import { TransactionHistoryModule } from './transaction_history/transaction_history.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { RegisterModule } from './register/register.module';
//import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configSQLite } from 'orem-config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configSQLite),
    JwtModule,
    UserModule,
    AuthModule,
    CustomerModule,
    JobModule,
    ProviderModule,
    TransactionHistoryModule,
    RegisterModule,
    //DbModule,
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
