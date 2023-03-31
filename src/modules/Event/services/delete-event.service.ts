import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { IEventRepository } from '../interfaces/event.interface';

@Injectable()
export class DeleteEventService {
  constructor(private readonly eventRepository: IEventRepository) {}

  public async execute(_id: string): Promise<void> {
    const result = await this.eventRepository.findById(_id);

    if (!result) throw new NotFoundException([AppMessage.ACCOUNT_NOT_FOUND]);

    await this.eventRepository.delete(result._id);
  }
}
