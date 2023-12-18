import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    allowedHeaders: [],
    maxAge: 3600,
    methods: '*',
    origin: 'http://localhost:3000',
  });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
