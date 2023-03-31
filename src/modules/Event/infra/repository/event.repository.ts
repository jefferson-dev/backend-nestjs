import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IEventRepository } from '../../interfaces/event.interface';
import { Event as EventSchema, EventDocument } from '../schema/event.schema';
import { Event, EventData } from '../entity/event';
import { Paginate } from '@module/_shared/value-object/paginate';
import { ListEventOutput } from '@module/Event/dtos/list-event.dto';
import { Ticket, TicketData } from '../entity/ticket';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectModel(EventSchema.name)
    private readonly repository: Model<EventDocument>,
  ) {}

  public async find(paginate: Paginate): Promise<ListEventOutput> {
    const events = await this.repository
      .find()
      .sort(paginate.sort)
      .skip(paginate.skip)
      .limit(paginate.limit)
      .populate({
        path: 'tickets',
        transform: (ticket: TicketData) => {
          if (ticket) return new Ticket(ticket);
        },
      });

    return events.map((event) => new Event(event));
  }

  public async findById(_id: string): Promise<EventData | null> {
    const event = await this.repository.findById({ _id: new Types.ObjectId(_id) }).populate({
      path: 'tickets',
      transform: (ticket: TicketData) => {
        if (ticket) return new Ticket(ticket);
      },
    });

    if (event) return new Event(event);
  }

  public async findByEmail(email: string): Promise<EventData | null> {
    const event = await this.repository.findOne({ email }).populate({
      path: 'tickets',
      transform: (ticket: TicketData) => {
        if (ticket) return new Ticket(ticket);
      },
    });

    if (event) return new Event(event);
  }

  public async create(data: EventData): Promise<EventData> {
    return this.repository.create(data);
  }

  public async save(_id: string, data: EventData): Promise<EventData> {
    return this.repository.findByIdAndUpdate({ _id: new Types.ObjectId(_id) }, data, { new: true });
  }

  public async delete(_id: string): Promise<void> {
    await this.repository.findByIdAndDelete({ _id: new Types.ObjectId(_id) });
  }
}
