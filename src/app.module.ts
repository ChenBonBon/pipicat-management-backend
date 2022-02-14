import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { HttpInterceptor } from './interceptors/HttpInterceptor';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

export const logger = WinstonModule.createLogger({
  level: 'verbose',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('pipicat'),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/example.log',
    }),
  ],
});

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:20221/pipicat', {
      dbName: 'pipicat',
      user: 'pipicat',
      pass: 'chenroc1001',
    }),
    UserModule,
    RoleModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    Logger,
  ],
})
export class AppModule {}
