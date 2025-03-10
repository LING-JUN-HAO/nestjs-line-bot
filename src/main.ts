import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/webhook', express.raw({ type: '*/*' }));
  app.use(bodyParser.json());
  await app.listen(3000);
}

void bootstrap();
