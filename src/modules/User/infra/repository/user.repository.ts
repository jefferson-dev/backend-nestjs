import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Paginate } from '@module/_shared/value-object/paginate';
import { IUserRepository } from '../../interfaces/user.interface';
import { User as UserSchema, UserDocument } from '../schema/user.schema';
import { User, UserData } from '../entity/user';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly repository: Model<UserDocument>,
  ) {}

  public async find(paginate: Paginate): Promise<UserData[]> {
    const users = await this.repository
      .find()
      .sort(paginate.sort ?? null)
      .skip(paginate.skip ?? 0)
      .limit(paginate.limit ?? 0);

    return users.map((user) => new User(user));
  }

  public async findById(_id: string): Promise<UserData> {
    const user = await this.repository.findById({ _id: new Types.ObjectId(_id) });

    if (user) return new User(user);
  }

  public async create(data: UserData): Promise<UserData> {
    return this.repository.create(data);
  }

  public async save(_id: string, data: UserData): Promise<UserData> {
    return this.repository.findByIdAndUpdate({ _id: new Types.ObjectId(_id) }, data, { new: true });
  }

  public async delete(_id: string): Promise<void> {
    await this.repository.findByIdAndDelete({ _id: new Types.ObjectId(_id) });
  }
}
