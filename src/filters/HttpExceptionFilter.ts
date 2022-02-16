import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Request, Response } from 'express';
import { logger } from 'src/app.module';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    logger.error(
      `
${exception.stack}
${JSON.stringify(
  {
    path: request.url,
    statusCode: status,
    timestamp: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  },
  null,
  '\t',
)}
      `,
    );

    response.status(status).json(exception.getResponse());
  }
}
