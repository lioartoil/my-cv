import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const cookieSession = require('cookie-session'); // eslint-disable-line @typescript-eslint/no-var-requires

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieSession({ keys: ['abadsfsdf'] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}

bootstrap();
