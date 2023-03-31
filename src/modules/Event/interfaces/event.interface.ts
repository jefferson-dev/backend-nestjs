import { Paginate } from '@module/_shared/value-object/paginate';
import { ListEventOutput } from '../dtos/list-event.dto';
import { EventData } from '../infra/entity/event';

export abstract class IEventRepository {
  abstract find(paginate: Paginate): Promise<ListEventOutput>;
  abstract findById(_id: string): Promise<EventData | undefined>;
  abstract findByEmail(email: string): Promise<EventData | null>;
  abstract create(data: EventData): Promise<EventData>;
  abstract save(_id: string, data: EventData): Promise<EventData>;
  abstract delete(_id: string): Promise<void>;
}
