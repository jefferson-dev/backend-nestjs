import { IsString, IsOptional, IsDate } from 'class-validator';
import { EventData } from '../infra/entity/event';

export class UpdateEventInput {
  @IsOptional()
  @IsString({ message: 'O campo nome é inválido.' })
  name: string;

  @IsOptional()
  @IsString({ message: 'O campo descrição é inválido.' })
  description: string;

  @IsOptional()
  @IsDate({ message: 'O campo data do evento é inválido.' })
  eventDate: Date;

  @IsOptional()
  @IsString({ message: 'O campo local é inválido.' })
  place: string;

  @IsOptional()
  @IsString({ message: 'O campo atrações é inválido.' })
  attractions: string;
}

export type UpdateEventOutput = EventData;
