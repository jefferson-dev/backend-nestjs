import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ITicketRepository } from '../../interfaces/ticket.interface';
import { Ticket as TicketSchema, TicketDocument } from '../schema/ticket.schema';
import { Ticket, TicketData } from '../entity/ticket';

@Injectable()
export class TicketRepository implements ITicketRepository {
  constructor(
    @InjectModel(TicketSchema.name)
    private readonly repository: Model<TicketDocument>,
  ) {}

  public async findById(_id: string): Promise<TicketData> {
    return new Ticket(await this.repository.findById({ _id: new Types.ObjectId(_id) }));
  }

  public async create(data: TicketData): Promise<TicketData> {
    return new Ticket(await this.repository.create(data));
  }

  public async save(_id: string, data: TicketData): Promise<TicketData> {
    return new Ticket(await this.repository.findByIdAndUpdate({ _id: new Types.ObjectId(_id) }, data, { new: true }));
  }

  public async delete(_id: string): Promise<void> {
    await this.repository.findByIdAndDelete({ _id: new Types.ObjectId(_id) });
  }
}
