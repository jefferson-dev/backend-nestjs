import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { UpdateUserInput, UpdateUserOutput } from '../dtos/update-user.dto';
import { User } from '../infra/entity/user';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(_id: string, data: UpdateUserInput): Promise<UpdateUserOutput> {
    const user = await this.userRepository.findById(_id);

    if (!user) throw new NotFoundException([AppMessage.USER_NOT_FOUND]);

    return this.userRepository.save(_id, new User(data));
  }
}
