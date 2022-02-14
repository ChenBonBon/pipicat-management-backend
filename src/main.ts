import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const config = new DocumentBuilder()
    .setTitle('皮皮猫后台管理系统')
    .setDescription('皮皮猫后台管理系统API文档')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(Log4jsLogger));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(11252);
}
bootstrap();
