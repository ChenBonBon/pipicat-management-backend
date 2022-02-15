import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { FetchPermissionsFilters } from './permission.types';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async fetchPermissions(
    @Query('current', new ParseIntPipe()) current: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('name') name: string | undefined,
    @Query('status') status: 'enabled' | 'disabled' | undefined,
  ) {
    const filters: FetchPermissionsFilters = {};
    if (name) {
      filters.name = { $regex: name };
    }

    if (status) {
      filters.status = status;
    }

    const res = await this.permissionService.fetchPermissions(
      {
        current,
        pageSize,
      },
      filters,
    );

    if (res) {
      const data = res.data.map((permission) => {
        const { _id, name, description, status } = permission;
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
}
