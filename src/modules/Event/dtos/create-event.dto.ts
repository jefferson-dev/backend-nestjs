import { IsISO8601, IsString } from 'class-validator';

export class CreateEventInput {
  @IsString({ message: 'O campo nome é inválido.' })
  name: string;

  @IsString({ message: 'O campo descrição é inválido.' })
  description: string;

  @IsISO8601({}, { message: 'O campo data do evento é inválido.' })
  eventDate: Date;

  @IsString({ message: 'O campo local é inválido.' })
  place: string;

  @IsString({ message: 'O campo atrações é inválido.' })
  attractions: string;
}

export type CreateEventOutput = void;
