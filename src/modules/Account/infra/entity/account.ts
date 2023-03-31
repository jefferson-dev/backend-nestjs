import { Schema } from 'mongoose';
import { RoleEnum } from '@module/_shared/enums/role.enum';
import { UserData } from '@module/User/infra/entity/user';

export class AccountData {
  _id?: string;
  email?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
  userId?: string | Schema.Types.ObjectId;
  user?: UserData;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Account extends AccountData {
  constructor(input: AccountData) {
    super();
    this._id = input._id && input._id.toString();
    this.email = input.email;
    this.password = input.password;
    this.role = input.role as RoleEnum;
    this.isActive = input.isActive;
    this.user = input.user;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
}
