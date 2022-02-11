import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isDate } from 'class-validator';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    if (value) {
      const val = new Date(value);
      if (!isDate(val)) {
        throw new BadRequestException('Validation failed');
      }
      return val;
    }
  }
}
