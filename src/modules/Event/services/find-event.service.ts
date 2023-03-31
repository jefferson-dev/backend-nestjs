import { Injectable } from '@nestjs/common';
import { Paginate } from '@module/_shared/value-object/paginate';
import { ListEventInput, ListEventOutput } from '../dtos/list-event.dto';
import { IEventRepository } from '../interfaces/event.interface';

@Injectable()
export class FindEventService {
  constructor(private readonly eventRepository: IEventRepository) {}

  public async execute({ ...paginate }: ListEventInput): Promise<ListEventOutput> {
    return this.eventRepository.find(new Paginate(paginate));
  }
}
