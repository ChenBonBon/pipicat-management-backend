import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FetchListBody } from 'src/declaration';
import { RoleDocument, UserDocument } from 'src/schemas/user.schema';
import { AddUserBody, FetchUsersFilters, UpdateUserBody } from './user.types';

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
}
