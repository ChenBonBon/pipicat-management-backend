import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { ParseDatePipe } from 'src/pipes/ParseDatePipe';
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
  @ApiProperty({
    description: '用户状态',
  })
  @IsOptional()
  @IsIn(['enabled', 'locked'])
  status?: 'enabled' | 'locked';
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchUsers(
    @Query('current', new ParseIntPipe()) current: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('name') name: string | undefined,
    @Query('gender') gender: 'male' | 'female' | undefined,
    @Query('status') status: 'enabled' | 'locked' | undefined,
    @Query('startDate', new ParseDatePipe()) startDate: Date | undefined,
    @Query('endDate', new ParseDatePipe()) endDate: Date | undefined,
  ) {
    const filters: FetchUserFilters = {
      status: { $ne: 'disabled' },
    };
    const birthdayFilter: any = {};

    if (name) {
      filters.name = { $regex: name };
    }
    if (gender) {
      filters.gender = gender;
    }
    if (status) {
      filters.status = status;
    }
    if (startDate) {
      birthdayFilter.$gte = startDate;
    }
    if (endDate) {
      birthdayFilter.$lt = endDate;
    }
    if (Object.keys(birthdayFilter).length > 0) {
      filters.birthday = birthdayFilter;
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

  @Get(':id')
  async fetchUser(@Param('id') id: string) {
    const user = await this.userService.fetchUser(id);
    if (user) {
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
    }
  }

  @Post()
  async addUser(
    @Body('name') name: string,
    @Body('gender') gender?: 'male' | 'female',
    @Body('birthday', new ParseDatePipe()) birthday?: Date,
    @Body('mobile') mobile?: string,
    @Body('email') email?: string,
  ) {
    return this.userService.addUser({ name, gender, birthday, mobile, email });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('gender') gender?: 'male' | 'female',
    @Body('birthday', new ParseDatePipe()) birthday?: Date,
    @Body('mobile') mobile?: string,
    @Body('email') email?: string,
    @Body('status') status?: 'enabled' | 'locked',
  ) {
    return this.userService.updateUser(id, {
      name,
      gender,
      birthday,
      mobile,
      email,
      status,
    });
  }
}
