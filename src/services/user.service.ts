import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddRoleBody,
  AddUserBody,
  FetchRolesFilters,
  FetchUsersFilters,
  UpdateRoleBody,
  UpdateUserBody,
} from 'src/controllers/user.controller';
import { FetchListBody } from 'src/declaration';
import { RoleDocument, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Role') private roleModel: Model<RoleDocument>,
  ) {}

  async fetchUsers(fetchUsersBody: FetchListBody, filters: FetchUsersFilters) {
    const { current, pageSize } = fetchUsersBody;
    const data = await this.userModel
      .find(filters)
      .skip((current - 1) * pageSize)
      .limit(pageSize);
    const total = await this.userModel.find(filters).count();

    return { data, total };
  }

  async fetchUser(id: string) {
    try {
      const data = await this.userModel.findById(id);

      return data;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async addUser(addUserBody: AddUserBody) {
    const createdUser = new this.userModel(addUserBody);
    const res = await createdUser.save();
    if (res) {
      return {
        code: 0,
        message: `Add user ${res._id} successfully.`,
      };
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await this.userModel.updateOne(
        { _id: id },
        {
          $set: { status: 'disabled' },
        },
      );
      if (deletedUser) {
        return {
          code: 0,
          message: `Delete user ${id} successfully.`,
        };
      }
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateUser(id: string, updateUserBody: UpdateUserBody) {
    try {
      const updatedUser = await this.userModel.updateOne(
        { _id: id },
        {
          $set: updateUserBody,
        },
      );
      if (updatedUser) {
        return {
          code: 0,
          message: `Update user ${id} successfully.`,
        };
      }
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async fetchRoles(fetchRolesBody: FetchListBody, filters: FetchRolesFilters) {
    const { current, pageSize } = fetchRolesBody;
    const data = await this.roleModel
      .find(filters)
      .skip((current - 1) * pageSize)
      .limit(pageSize);
    const total = await this.roleModel.find(filters).count();

    return { data, total };
  }

  async fetchRole(id: string) {
    try {
      const data = await this.roleModel.findById(id);

      return data;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async addRole(addRoleBody: AddRoleBody) {
    const createdRole = new this.roleModel(addRoleBody);
    const res = await createdRole.save();
    if (res) {
      return {
        code: 0,
        message: `Add role ${res._id} successfully.`,
      };
    }
  }

  async updateRole(id: string, updateRoleBody: UpdateRoleBody) {
    try {
      const updatedRole = await this.roleModel.updateOne(
        { _id: id },
        {
          $set: updateRoleBody,
        },
      );
      if (updatedRole) {
        return {
          code: 0,
          message: `Update role ${id} successfully.`,
        };
      }
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
