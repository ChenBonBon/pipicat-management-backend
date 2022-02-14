import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { RoleController } from './role.controller';
import { Role, RoleSchema } from './role.schema';
import { RoleService } from './role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
