import { TicketTypeEnum } from '@module/Event/enum/ticket-type-enum';
import { Schema } from 'mongoose';

export class TicketData {
  _id?: string;
  eventId: string | Schema.Types.ObjectId;
  name: string;
  type: string | TicketTypeEnum;
  sector: string;
  batch: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Ticket extends TicketData {
  constructor(input: TicketData) {
    super();
    this._id = input._id && input._id.toString();
    this.eventId = input.eventId && input.eventId.toString();
    this.name = input.name;
    this.type = input.type;
    this.sector = input.sector;
    this.batch = input.batch;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
}
