import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TicketTypeEnum } from '../enum/ticket-type-enum';

export class CreateTicketInput {
  @IsString({ message: 'O campo nome é inválido.' })
  name: string;

  @IsEnum(TicketTypeEnum, { message: 'O campo tipo é inválido.' })
  type: TicketTypeEnum;

  @IsString({ message: 'O campo setor é inválido.' })
  sector: string;

  @IsNumber({}, { message: 'O campo lote é inválido.' })
  batch: number;
}

export type CreateTicketOutput = void;
