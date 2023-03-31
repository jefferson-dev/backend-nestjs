import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { TicketTypeEnum } from '../enum/ticket-type-enum';
import { TicketData } from '../infra/entity/ticket';

export class UpdateTicketInput {
  @IsOptional()
  @IsString({ message: 'O campo nome é inválido.' })
  name: string;

  @IsOptional()
  @IsEnum(TicketTypeEnum, { message: 'O campo tipo é inválido.' })
  type: TicketTypeEnum;

  @IsOptional()
  @IsString({ message: 'O campo setor é inválido.' })
  sector: string;

  @IsOptional()
  @IsNumber({}, { message: 'O campo lote é inválido.' })
  batch: number;
}

export type UpdateTicketOutput = TicketData;
