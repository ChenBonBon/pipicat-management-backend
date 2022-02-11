import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  gender: 'male' | 'female';

  @Prop()
  birthday: string;

  @Prop()
  mobile: string;

  @Prop()
  email: string;

  @Prop({ default: 'enabled' })
  status: 'enabled' | 'disabled';
}

export const UserSchema = SchemaFactory.createForClass(User);
