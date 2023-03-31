import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: null })
  document_type?: string;

  @Prop({ required: false, default: null })
  document_number?: string;

  @Prop({ required: false, default: null })
  birth_date?: Date;

  @Prop({ required: false, default: null })
  street?: string;

  @Prop({ required: false, default: null })
  street_number?: number;

  @Prop({ required: false, default: null })
  complement?: string;

  @Prop({ required: false, default: null })
  zipcode?: string;

  @Prop({ required: false, default: null })
  district?: string;

  @Prop({ required: false, default: null })
  city?: string;

  @Prop({ required: false, default: null })
  state?: string;

  @Prop({ required: false, default: null })
  phone?: string;

  @Prop({ required: false, default: null })
  avatar?: string;

  @Prop({ required: false, default: null })
  cover?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
