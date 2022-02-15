import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { HttpInterceptor } from './interceptors/HttpInterceptor';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
  winston.format.align(),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/pipicat-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

export const logger = WinstonModule.createLogger({
  level: 'verbose',
  format: logFormat,
  transports: [
    transport,
    new winston.transports.Console({
      level: 'info',
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
    PermissionModule,
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
