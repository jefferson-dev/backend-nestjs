import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { UpdateTicketInput, UpdateTicketOutput } from '../dtos/update-ticket.dto';
import { Ticket } from '../infra/entity/ticket';
import { ITicketRepository } from '../interfaces/ticket.interface';

@Injectable()
export class UpdateTicketService {
  constructor(private readonly ticketRepository: ITicketRepository) {}

  public async execute(eventId: string, ticketId: string, data: UpdateTicketInput): Promise<UpdateTicketOutput> {
    const result = await this.ticketRepository.findById(ticketId);

    console.log(result.eventId);

    if (!result) throw new NotFoundException([AppMessage.USER_NOT_FOUND]);

    return this.ticketRepository.save(ticketId, new Ticket({ ...data, eventId }));
  }
}
