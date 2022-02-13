import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FetchRolesFilters {
  @ApiProperty({
    description: '姓名',
  })
  @IsOptional()
  name?: any;

  @ApiProperty({
    description: '性别',
  })
  @IsOptional()
  @IsIn(['male', 'female'])
  gender?: 'male' | 'female';

  @ApiProperty({
    description: '用户状态',
  })
  @IsOptional()
  @IsIn(['enabled', 'locked'])
  status?: any;

  @ApiProperty({
    description: '出生日期',
  })
  @IsOptional()
  birthday?: any;
}

export class AddRoleBody {
  @ApiProperty({
    description: '角色名',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: '角色描述',
    default: '',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({
    description: '状态',
    default: false,
  })
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  readonly status?: 'enabled' | 'disabled';
}

export class UpdateRoleBody {
  @ApiProperty({
    description: '角色名',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: '角色描述',
    default: '',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({
    description: '状态',
    default: false,
  })
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  readonly status?: 'enabled' | 'disabled';
}
