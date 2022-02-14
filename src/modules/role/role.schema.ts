import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: 'enabled' })
  status: 'enabled' | 'disabled';
}

export const RoleSchema = SchemaFactory.createForClass(Role);
