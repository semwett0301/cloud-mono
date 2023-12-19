import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // app.enableCors({
  //   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Key', 'Authorization', 'Secret'],
  //   maxAge: 3600,
  //   methods: ['POST', 'GET', 'PATCH', 'OPTIONS', 'DELETE', 'PUT'],
  //   origin: 'http://localhost:3000',
  // });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
