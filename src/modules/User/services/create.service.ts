import { Injectable } from '@nestjs/common';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import { User } from '../infra/entity/user';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: CreateUserInput): Promise<CreateUserOutput> {
    return this.userRepository.create(new User(data));
  }
}
