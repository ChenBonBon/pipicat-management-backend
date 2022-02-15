import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { logger } from 'src/app.module';

const parseQuery = (query: string) => {
  const res = {};

  if (query) {
    const queries = query.split('&');
    if (queries.length > 0) {
      queries.forEach((query) => {
        const key = query.split('=')[0];
        const value = query.split('=')[1];
        res[key] = { value, type: typeof value };
      });
    }
  }

  return res;
};

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, body, _parsedUrl } = request;
    const { pathname, query } = _parsedUrl;

    logger.log(
      JSON.stringify(
        { path: `${method} ${pathname}`, query: parseQuery(query), body },
        null,
        '\t',
      ),
    );
    return next.handle();
  }
}
