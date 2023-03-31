import { RoleEnum } from '@module/_shared/enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({
  timestamps: true,
  id: false,
  toJSON: {
    virtuals: true,
  },
})
export class Account {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, ref: 'User', default: null })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, enum: RoleEnum, default: RoleEnum.USER })
  role: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

export { AccountSchema };
