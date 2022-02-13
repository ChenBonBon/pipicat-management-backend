import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseDatePipe } from 'src/pipes/ParseDatePipe';
import { UserService } from './user.service';
import { FetchRolesFilters, FetchUsersFilters } from './user.types';

const logger = new Logger('user.service');

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
    @Query('roleId') roleId: string,
    @Query('status') status: 'enabled' | 'locked' | undefined,
    @Query('startDate', new ParseDatePipe()) startDate: Date | undefined,
    @Query('endDate', new ParseDatePipe()) endDate: Date | undefined,
  ) {
    const filters: FetchUsersFilters = {
      status: { $ne: 'disabled' },
    };
    const birthdayFilter: any = {};

    if (name) {
      filters.name = { $regex: name };
    }
    if (gender) {
      filters.gender = gender;
    }
    if (roleId) {
      filters.roleId = roleId;
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
        const { _id, name, gender, birthday, mobile, email, roleId, status } =
          user;
        return {
          id: _id,
          name,
          gender,
          birthday,
          mobile,
          email,
          roleId,
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

  @Get('/roles')
  async fetchRoles(
    @Query('current', new ParseIntPipe()) current: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('name') name: string | undefined,
    @Query('status') status: 'enabled' | 'disabled' | undefined,
  ) {
    const filters: FetchRolesFilters = {};

    if (name) {
      filters.name = { $regex: name };
    }

    if (status) {
      filters.status = status;
    }

    const res = await this.userService.fetchRoles(
      {
        current,
        pageSize,
      },
      filters,
    );

    if (res) {
      const data = res.data.map((role) => {
        const { _id, name, description, status } = role;
        return {
          id: _id,
          name,
          description,
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

  @Get('/roles/options')
  async fetchRoleOptions() {
    const res = await this.userService.fetchRoleOptions();

    if (res) {
      const roles = res.map((role) => {
        const { _id, name } = role;
        return {
          id: _id,
          name,
        };
      });

      return roles;
    }
    return [];
  }

  @Get('/role/:id')
  async fetchRole(@Param('id') id: string) {
    const role = await this.userService.fetchRole(id);

    if (role) {
      const { _id, name, description, status } = role;
      return {
        id: _id,
        name,
        description,
        status,
      };
    }
  }

  @Get(':id')
  async fetchUser(@Param('id') id: string) {
    const user = await this.userService.fetchUser(id);

    if (user) {
      const { _id, name, gender, birthday, mobile, email, roleId, status } =
        user;

      return {
        id: _id,
        name,
        gender,
        birthday,
        mobile,
        email,
        roleId,
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
    @Body('roleId') roleId?: string,
  ) {
    return this.userService.addUser({
      name,
      gender,
      birthday,
      mobile,
      email,
      roleId,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch('role/:id')
  async updateRole(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description?: string,
    @Body('status') status?: 'enabled' | 'disabled',
  ) {
    return this.userService.updateRole(id, {
      name,
      description,
      status,
    });
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('gender') gender?: 'male' | 'female',
    @Body('birthday', new ParseDatePipe()) birthday?: Date,
    @Body('mobile') mobile?: string,
    @Body('email') email?: string,
    @Body('roleId') roleId?: string,
    @Body('status') status?: 'enabled' | 'locked',
  ) {
    return this.userService.updateUser(id, {
      name,
      gender,
      birthday,
      mobile,
      email,
      roleId,
      status,
    });
  }

  @Post('/role')
  async addRole(
    @Body('name') name: string,
    @Body('description') description?: string,
    @Body('status') status?: 'enabled' | 'disabled',
  ) {
    return this.userService.addRole({ name, description, status });
  }
}
