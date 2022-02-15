import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: 'enabled' })
  status: 'enabled' | 'disabled';
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
