import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Log4jsModule } from '@nestx-log4js/core';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    Log4jsModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:20221/pipicat', {
      dbName: 'pipicat',
      user: 'pipicat',
      pass: 'chenroc1001',
    }),
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
