import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Log4jsModule } from '@nestx-log4js/core';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    Log4jsModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:20221/pipicat', {
      dbName: 'pipicat',
      user: 'pipicat',
      pass: 'chenroc1001',
    }),
    UserModule,
  ],
})
export class AppModule {}
