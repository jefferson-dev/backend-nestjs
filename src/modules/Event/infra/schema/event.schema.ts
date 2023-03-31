import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({
  timestamps: true,
  id: false,
  toJSON: {
    virtuals: true,
  },
})
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  eventDate: Date;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  attractions: string;
}

const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'eventId',
});

export { EventSchema };
