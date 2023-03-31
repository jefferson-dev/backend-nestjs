import { PaginateDTO } from '@module/_shared/dto/paginate.dto';
import { AccountData } from '../infra/entity/account';

export class ListAccountInput extends PaginateDTO {}

export type ListAccountOutput = AccountData[];
