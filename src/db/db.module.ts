import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        url: 'mysql://root:maCRCVxjVuqhXGbiAlTlZDPzJAXTHIKr@roundhouse.proxy.rlwy.net:31140/railway',
        entities: [`${__dirname}/**/*.model{.ts,.js}`],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
