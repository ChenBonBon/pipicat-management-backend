import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FetchListBody {
  @ApiProperty({
    description: '页码',
  })
  @IsNumber()
  readonly current: number;

  @ApiProperty({
    description: '每页条数',
  })
  @IsNumber()
  readonly pageSize: number;
}
