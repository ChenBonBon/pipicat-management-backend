import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FetchRolesFilters {
  @ApiProperty({
    description: '角色名',
  })
  @IsOptional()
  name?: any;

  @ApiProperty({
    description: '角色状态',
  })
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  status?: any;
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
