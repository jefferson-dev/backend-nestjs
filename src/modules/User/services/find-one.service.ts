import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { UserData } from '../infra/entity/user';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class FindOneUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(_id: string): Promise<UserData> {
    const result = await this.userRepository.findById(_id);

    if (!result) throw new NotFoundException([AppMessage.USER_NOT_FOUND]);

    return result;
  }
}
