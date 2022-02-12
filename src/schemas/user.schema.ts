import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export type RoleDocument = Role & Document;

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  gender: 'male' | 'female';

  @Prop()
  birthday: Date;

  @Prop()
  mobile: string;

  @Prop()
  email: string;

  @Prop()
  roleId: string;

  @Prop({ default: 'enabled' })
  status: 'enabled' | 'disabled' | 'locked';
}

@Schema()
export class Role extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: 'enabled' })
  status: 'enabled' | 'disabled';
}

export const UserSchema = SchemaFactory.createForClass(User);
export const RoleSchema = SchemaFactory.createForClass(Role);
