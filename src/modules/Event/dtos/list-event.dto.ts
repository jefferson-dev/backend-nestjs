import { PaginateDTO } from '@module/_shared/dto/paginate.dto';
import { EventData } from '../infra/entity/event';

export class ListEventInput extends PaginateDTO {}

export type ListEventOutput = EventData[];
