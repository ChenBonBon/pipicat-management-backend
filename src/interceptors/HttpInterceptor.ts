import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const parseQuery = (query) => {
  const queries = query.split('&');
  const res = {};
  if (queries.length > 0) {
    queries.forEach((query) => {
      const key = query.split('=')[0];
      const value = query.split('=')[1];
      res[key] = { value, type: typeof value };
    });
  }

  return res;
};

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { pathname, query } = request._parsedUrl;
    const logger = new Logger(context.getClass().name);
    logger.log(
      JSON.stringify({ pathname, query: parseQuery(query) }, null, '\t'),
    );
    return next.handle();
  }
}
