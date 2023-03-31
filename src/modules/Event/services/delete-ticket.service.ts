import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { ITicketRepository } from '../interfaces/ticket.interface';

@Injectable()
export class DeleteTicketService {
  constructor(private readonly ticketRepository: ITicketRepository) {}

  public async execute(eventId: string, ticketId: string): Promise<void> {
    const result = await this.ticketRepository.findById(ticketId);

    if (!result) throw new NotFoundException([AppMessage.ACCOUNT_NOT_FOUND]);

    await this.ticketRepository.delete(result._id);
  }
}
