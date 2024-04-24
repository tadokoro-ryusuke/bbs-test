import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {origin: [/^https?:\/\/localhost:/]},
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(8080);
}

bootstrap();
