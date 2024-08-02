import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { CustomerModule } from 'src/customer/customer.module';
import { ProviderModule } from 'src/provider/provider.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CustomerModule,
    ProviderModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_TIME'),
        },
      }),
    }),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
