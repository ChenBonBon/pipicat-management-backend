import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserService } from '../services/user.service';

export class FetchUsersBody {
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

export class FetchUserFilters {
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
  @IsIn(['enabled', 'disabled'])
  status?: 'enabled' | 'disabled';
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
  readonly birthday?: string;

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
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchUsers(
    @Query('current', new ParseIntPipe()) current: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('name') name: string,
    @Query('gender') gender: 'male' | 'female',
    @Query('status') status: 'enabled' | 'disabled',
  ) {
    const filters: FetchUserFilters = {};

    if (name) {
      filters.name = { $regex: name };
    }
    if (gender) {
      filters.gender = gender;
    }
    if (status) {
      filters.status = status;
    }
    const res = await this.userService.fetchUsers(
      {
        current,
        pageSize,
      },
      filters,
    );
    if (res) {
      const data = res.data.map((user) => {
        const { _id, name, gender, birthday, mobile, email, status } = user;
        return {
          id: _id,
          name,
          gender,
          birthday,
          mobile,
          email,
          status,
        };
      });

      return {
        data,
        total: res.total,
      };
    }
    return {
      data: [],
      total: 0,
    };
  }

  @Post()
  async addUser(@Body() addUserBody: AddUserBody) {
    return this.userService.addUser(addUserBody);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
