import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { GetTracerId } from '@infra/middlewares/rTracer';
import { ILogger, LoggerService } from '@infra/providers/logger';
import { StorageModule } from '@infra/providers/storage';
import { Event, EventSchema } from './infra/schema/event.schema';
import { Ticket, TicketSchema } from './infra/schema/ticket.schema';
import { IEventRepository } from './interfaces/event.interface';
import { EventRepository } from './infra/repository/event.repository';
import { ITicketRepository } from './interfaces/ticket.interface';
import { TicketRepository } from './infra/repository/ticket.repository';
import { EventController } from './controllers/event.controller';
import { FindEventService } from './services/find-event.service';
import { FindOneEventService } from './services/find-one-event.service';
import { CreateEventService } from './services/create-event.service';
import { UpdateEventService } from './services/update-event.service';
import { DeleteEventService } from './services/delete-event.service';
import { CreateTicketService } from './services/create-ticket.service';
import { UpdateTicketService } from './services/update-ticket.service';
import { DeleteTicketService } from './services/delete-ticket.service';
import { UploadFileService } from './services/upload-file.service';
import { TokenModule } from '@infra/providers/token';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Ticket.name, schema: TicketSchema },
    ]),
    TokenModule,
    StorageModule,
  ],
  controllers: [EventController],
  providers: [
    {
      provide: ILogger,
      inject: [EnvironmentVariables.KEY],
      useFactory: (config: EnvironmentVariablesType) => new LoggerService(config, 'Event', GetTracerId),
    },
    { provide: IEventRepository, useClass: EventRepository },
    { provide: ITicketRepository, useClass: TicketRepository },
    FindEventService,
    FindOneEventService,
    CreateEventService,
    UpdateEventService,
    DeleteEventService,
    CreateTicketService,
    UpdateTicketService,
    DeleteTicketService,
    UploadFileService,
  ],
})
export class EventModule {}
