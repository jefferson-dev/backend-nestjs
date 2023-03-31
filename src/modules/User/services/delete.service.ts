import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(_id: string): Promise<void> {
    const result = await this.userRepository.findById(_id);

    if (!result) throw new NotFoundException([AppMessage.USER_NOT_FOUND]);

    await this.userRepository.delete(result._id);
  }
}
