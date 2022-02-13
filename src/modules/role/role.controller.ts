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
import { RoleService } from './role.service';
import { FetchRolesFilters } from './role.types';

const logger = new Logger('role.service');

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

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

    const res = await this.roleService.fetchRoles(
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
    const res = await this.roleService.fetchRoleOptions();

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
    const role = await this.roleService.fetchRole(id);

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
    return this.roleService.updateRole(id, {
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
    return this.roleService.addRole({ name, description, status });
  }
}
