import { PaginateDTO } from '@module/_shared/dto/paginate.dto';
import { UserData } from '../infra/entity/user';

export class ListUserInput extends PaginateDTO {}

export type ListUserOutput = UserData[];
