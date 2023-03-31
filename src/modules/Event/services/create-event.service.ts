import { Injectable } from '@nestjs/common';
import { CreateEventInput, CreateEventOutput } from '../dtos/create-event.dto';
import { Event } from '../infra/entity/event';
import { IEventRepository } from '../interfaces/event.interface';

@Injectable()
export class CreateEventService {
  constructor(private readonly eventRepository: IEventRepository) {}

  public async execute(data: CreateEventInput): Promise<CreateEventOutput> {
    await this.eventRepository.create(new Event(data));
  }
}
