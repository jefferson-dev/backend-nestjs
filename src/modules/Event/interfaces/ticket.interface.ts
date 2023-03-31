import { TicketData } from '../infra/entity/ticket';

export abstract class ITicketRepository {
  abstract findById(_id: string): Promise<TicketData | undefined>;
  abstract create(data: TicketData): Promise<TicketData>;
  abstract save(_id: string, data: TicketData): Promise<TicketData>;
  abstract delete(_id: string): Promise<void>;
}
