import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:20221/pipicat', {
      dbName: 'pipicat',
      user: 'pipicat',
      pass: 'chenroc1001',
    }),
    UserModule,
  ],
})
export class AppModule {}
