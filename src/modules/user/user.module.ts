import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../role/role.schema';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
