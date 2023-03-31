import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { UpdateEventInput, UpdateEventOutput } from '../dtos/update-event.dto';
import { Event } from '../infra/entity/event';
import { IEventRepository } from '../interfaces/event.interface';

@Injectable()
export class UpdateEventService {
  constructor(private readonly eventRepository: IEventRepository) {}

  public async execute(_id: string, data: UpdateEventInput): Promise<UpdateEventOutput> {
    const result = await this.eventRepository.findById(_id);

    if (!result) throw new NotFoundException([AppMessage.USER_NOT_FOUND]);

    return this.eventRepository.save(_id, new Event(data));
  }
}
