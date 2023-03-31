import { TicketTypeEnum } from '@module/Event/enum/ticket-type-enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true, ref: 'Event', index: true })
  eventId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: TicketTypeEnum })
  type: string;

  @Prop({ required: true })
  sector: string;

  @Prop({ required: true })
  batch: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
