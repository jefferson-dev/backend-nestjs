import { Injectable } from '@nestjs/common';
import { CreateTicketInput, CreateTicketOutput } from '../dtos/create-ticket.dto';
import { Ticket } from '../infra/entity/ticket';
import { ITicketRepository } from '../interfaces/ticket.interface';

@Injectable()
export class CreateTicketService {
  constructor(private readonly ticketRepository: ITicketRepository) {}

  public async execute(eventId: string, data: CreateTicketInput): Promise<CreateTicketOutput> {
    await this.ticketRepository.create(new Ticket({ ...data, eventId }));
  }
}
