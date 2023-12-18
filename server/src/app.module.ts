import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products';
import { S3Module } from './s3';
import { SetsModule } from './sets';
import { UsersModule } from './users';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
      {
        authSource: process.env.DB_NAME,
        retryWrites: true,
        tls: true,
        tlsCAFile: process.env.CACERT,
      },
    ),
    SetsModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    UsersModule,
    S3Module,
  ],
})
export class AppModule {}
