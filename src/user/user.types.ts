import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FetchUsersFilters {
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
    description: '角色',
  })
  @IsOptional()
  @IsString()
  roleId?: any;

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

export class AddUserBody {
  @ApiProperty({
    description: '姓名',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    description: '性别',
    default: 'male',
  })
  @IsOptional()
  @IsIn(['male', 'female'])
  readonly gender?: 'male' | 'female';

  @ApiPropertyOptional({
    description: '出生日期',
    default: new Date(),
  })
  @IsOptional()
  @IsDate()
  readonly birthday?: Date;

  @ApiPropertyOptional({
    description: '手机号',
    default: '17621627976',
  })
  @IsOptional()
  @IsMobilePhone('zh-CN')
  readonly mobile?: string;

  @ApiPropertyOptional({
    description: '邮箱',
    default: 'per_cherry@163.com',
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({
    description: '角色',
    default: '',
  })
  @IsOptional()
  @IsString()
  readonly roleId?: string;
}

export class UpdateUserBody {
  @ApiProperty({
    description: '姓名',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({
    description: '性别',
    default: 'male',
  })
  @IsOptional()
  @IsIn(['male', 'female'])
  readonly gender?: 'male' | 'female';

  @ApiPropertyOptional({
    description: '出生日期',
    default: new Date(),
  })
  @IsOptional()
  @IsDate()
  readonly birthday?: Date;

  @ApiPropertyOptional({
    description: '手机号',
    default: '17621627976',
  })
  @IsOptional()
  @IsMobilePhone('zh-CN')
  readonly mobile?: string;

  @ApiPropertyOptional({
    description: '邮箱',
    default: 'per_cherry@163.com',
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({
    description: '角色',
    default: '',
  })
  @IsOptional()
  @IsString()
  readonly roleId?: string;

  @ApiProperty({
    description: '用户状态',
  })
  @IsOptional()
  @IsIn(['enabled', 'locked'])
  status?: 'enabled' | 'locked';
}

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
