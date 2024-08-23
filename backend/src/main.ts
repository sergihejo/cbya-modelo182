import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use('/downloads', express.static(join(__dirname, '../downloads')));

  // app.use(bodyParser.urlencoded({ extended: true }));

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(3001);
}
bootstrap();
