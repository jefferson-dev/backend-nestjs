import { Paginate } from '@module/_shared/value-object/paginate';
import { ListAccountOutput } from '../dtos/list-account.dto';
import { AccountData } from '../infra/entity/account';
import { AccountOptions } from '../types/account-options.types';

export abstract class IAccountRepository {
  abstract find(paginate: Paginate, options?: AccountOptions): Promise<ListAccountOutput>;
  abstract findById(_id: string, options?: AccountOptions): Promise<AccountData | null>;
  abstract findByEmail(email: string, options?: AccountOptions): Promise<AccountData | null>;
  abstract create(data: AccountData): Promise<AccountData>;
  abstract save(_id: string, data: AccountData): Promise<AccountData>;
  abstract delete(_id: string): Promise<void>;
}
