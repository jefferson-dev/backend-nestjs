import { Paginate } from '@module/_shared/value-object/paginate';
import { UserData } from '../infra/entity/user';

export abstract class IUserRepository {
  abstract find(paginate?: Paginate): Promise<UserData[]>;
  abstract findById(_id: string): Promise<UserData | undefined>;
  abstract create(data: UserData): Promise<UserData>;
  abstract save(_id: string, data: UserData): Promise<UserData>;
  abstract delete(_id: string): Promise<void>;
}
