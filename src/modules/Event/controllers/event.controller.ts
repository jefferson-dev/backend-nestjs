import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@module/_shared/guards/jwt.guard';
import { RoleGuard } from '@module/_shared/guards/role.guard';
import { UseRole } from '@module/_shared/decorators/roles.decorator';
import { RoleEnum } from '@module/_shared/enums/role.enum';
import { ContextEventEnum } from '@module/_shared/enums/context.enum';
import { UploadFileOutput } from '@module/_shared/dto/upload-file.dto';
import { EventData } from '@module/Event/infra/entity/event';
import { ListEventInput, ListEventOutput } from '@module/Event/dtos/list-event.dto';
import { CreateEventInput, CreateEventOutput } from '@module/Event/dtos/create-event.dto';
import { UpdateEventInput, UpdateEventOutput } from '@module/Event/dtos/update-event.dto';
import { CreateTicketInput, CreateTicketOutput } from '@module/Event/dtos/create-ticket.dto';
import { UpdateTicketInput, UpdateTicketOutput } from '@module/Event/dtos/update-ticket.dto';
import { FindEventService } from '@module/Event/services/find-event.service';
import { FindOneEventService } from '@module/Event/services/find-one-event.service';
import { CreateEventService } from '@module/Event/services/create-event.service';
import { UpdateEventService } from '@module/Event/services/update-event.service';
import { DeleteEventService } from '@module/Event/services/delete-event.service';
import { CreateTicketService } from '@module/Event/services/create-ticket.service';
import { UpdateTicketService } from '@module/Event/services/update-ticket.service';
import { DeleteTicketService } from '@module/Event/services/delete-ticket.service';
import { UploadFileService } from '@module/Event/services/upload-file.service';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(
    private readonly createEventService: CreateEventService,
    private readonly findEventService: FindEventService,
    private readonly findOneEventService: FindOneEventService,
    private readonly updateEventService: UpdateEventService,
    private readonly deleteEventService: DeleteEventService,
    private readonly createTicketService: CreateTicketService,
    private readonly updateTicketService: UpdateTicketService,
    private readonly deleteTicketService: DeleteTicketService,
    private readonly uploadFile: UploadFileService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All Events' })
  public async find(@Query() filters: ListEventInput): Promise<ListEventOutput> {
    return this.findEventService.execute(filters);
  }

  @Get(':eventId')
  @ApiOperation({ summary: 'Get Event By ID' })
  public async findOne(@Param('eventId') eventId: string): Promise<EventData> {
    return this.findOneEventService.execute(eventId);
  }

  @Post()
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Create Event' })
  @ApiBearerAuth()
  public async createEvent(@Body() body: CreateEventInput): Promise<CreateEventOutput> {
    return this.createEventService.execute(body);
  }

  @Put(':eventId')
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Update Event' })
  @ApiBearerAuth()
  public async updateEvent(@Param('eventId') _id: string, @Body() body: UpdateEventInput): Promise<UpdateEventOutput> {
    return this.updateEventService.execute(_id, body);
  }

  @Delete(':eventId')
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Event' })
  @ApiBearerAuth()
  public async deleteEvent(@Param('eventId') _id: string): Promise<void> {
    await this.deleteEventService.execute(_id);
  }

  @Post(':eventId/ticket')
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Create Ticket' })
  @ApiBearerAuth()
  public async createTicket(
    @Param('eventId') eventId: string,
    @Body() body: CreateTicketInput,
  ): Promise<CreateTicketOutput> {
    return this.createTicketService.execute(eventId, body);
  }

  @Put(':eventId/ticket/:ticketId')
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Update Ticket' })
  @ApiBearerAuth()
  public async updateTicket(
    @Param('eventId') eventId: string,
    @Param('ticketId') ticketId: string,
    @Body() body: UpdateTicketInput,
  ): Promise<UpdateTicketOutput> {
    return this.updateTicketService.execute(eventId, ticketId, body);
  }

  @Delete(':eventId/ticket/:ticketId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseRole(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete Ticket' })
  @ApiBearerAuth()
  public async deleteTicket(@Param('eventId') eventId: string, @Param('ticketId') ticketId: string): Promise<void> {
    await this.deleteTicketService.execute(eventId, ticketId);
  }

  @Post('upload/:context')
  @UseRole(RoleEnum.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  public sendFile(
    @Param('context') context: ContextEventEnum,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileOutput> {
    return this.uploadFile.execute({ context, file });
  }
}
