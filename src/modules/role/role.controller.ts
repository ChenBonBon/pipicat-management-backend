import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './role.service';
import { FetchRolesFilters } from './role.types';

const logger = new Logger('user.service');

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Post('/role')
  async addRole(
    @Body('name') name: string,
    @Body('description') description?: string,
    @Body('status') status?: 'enabled' | 'disabled',
  ) {
    return this.userService.addRole({ name, description, status });
  }
}
