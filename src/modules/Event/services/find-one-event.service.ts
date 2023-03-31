import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { EventData } from '../infra/entity/event';
import { IEventRepository } from '../interfaces/event.interface';

@Injectable()
export class FindOneEventService {
  constructor(private readonly eventRepository: IEventRepository) {}

  public async execute(_id: string): Promise<EventData> {
    const result = await this.eventRepository.findById(_id);

    if (!result) throw new NotFoundException([AppMessage.USER_NOT_FOUND]);

    return result;
  }
}
