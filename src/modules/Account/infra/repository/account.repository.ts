import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Paginate } from '@module/_shared/value-object/paginate';
import { User, UserData } from '@module/User/infra/entity/user';
import { IAccountRepository } from '../../interfaces/account.interface';
import { Account as AccountSchema, AccountDocument } from '../schema/account.schema';
import { Account, AccountData } from '../entity/account';
import { AccountOptions } from '../../types/account-options.types';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectModel(AccountSchema.name)
    private readonly repository: Model<AccountDocument>,
  ) {}

  public async find(paginate?: Paginate, options?: AccountOptions): Promise<AccountData[]> {
    const accounts = await this.repository
      .find()
      .select(options && options.password ? null : '-password')
      .populate({
        path: 'user',
        strictPopulate: false,
        transform: (user: UserData) => {
          if (user) return new User(user);
        },
      })
      .sort(paginate.sort ?? null)
      .skip(paginate.skip ?? 0)
      .limit(paginate.limit ?? 0);

    return accounts.map((account) => new Account(account));
  }

  public async findById(_id: string, options?: AccountOptions): Promise<AccountData | null> {
    const account = await this.repository
      .findById({ _id: new Types.ObjectId(_id) })
      .select(options && options.password ? null : '-password')
      .populate({
        path: 'user',
        transform: (user: UserData) => {
          if (user) return new User(user);
        },
      });

    if (account) return new Account(account);
  }

  public async findByEmail(email: string, options?: AccountOptions): Promise<AccountData | null> {
    const account = await this.repository
      .findOne({ email })
      .select(options && options.password ? null : '-password')
      .populate({
        path: 'user',
        transform: (user: UserData) => {
          if (user) return new User(user);
        },
      });

    if (account) return new Account(account);
  }

  public async create(data: AccountData): Promise<AccountData> {
    return this.repository.create(data);
  }

  public async save(_id: string, data: AccountData): Promise<AccountData> {
    return this.repository.findByIdAndUpdate({ _id: new Types.ObjectId(_id) }, data, { new: true });
  }

  public async delete(_id: string): Promise<void> {
    await this.repository.findByIdAndDelete({ _id: new Types.ObjectId(_id) });
  }
}
