import { TicketData } from './ticket';

export class EventData {
  _id?: string;
  name: string;
  description: string;
  eventDate: Date;
  place: string;
  attractions: string;
  tickets?: TicketData;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Event extends EventData {
  constructor(input: EventData) {
    super();
    this._id = input._id && input._id.toString();
    this.name = input.name;
    this.description = input.description;
    this.eventDate = input.eventDate;
    this.place = input.place;
    this.attractions = input.attractions;
    this.tickets = input.tickets;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  // static object = (user: UserData): User => new User(user);

  // static array = (entities: UserData[]): User[] => entities.map((user) => this.object(user));
}
