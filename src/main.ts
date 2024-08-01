import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Primeiro desafio')
    .setDescription(
      'Esta documentação apresenta o funcionamento da API para o desafio',
    )
    .setVersion('1.0')
    .addTag('Documentação da API REST desafio I')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
