import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FetchListBody } from 'src/declaration';
import { PermissionDocument } from './permission.schema';
import { FetchPermissionsFilters } from './permission.types';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('Permission')
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async fetchPermissions(
    fetchPermissionBody: FetchListBody,
    filters: FetchPermissionsFilters,
  ) {
    try {
      const { current, pageSize } = fetchPermissionBody;
      const data = await this.permissionModel
        .find(filters)
        .skip((current - 1) * pageSize)
        .limit(pageSize);
      const total = await this.permissionModel.find(filters).count();

      return { data, total };
    } catch (error) {
      console.log(error);
    }
  }
}
