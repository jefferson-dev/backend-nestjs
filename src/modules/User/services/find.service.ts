import { Injectable } from '@nestjs/common';
import { Paginate } from '@module/_shared/value-object/paginate';
import { ListUserInput, ListUserOutput } from '../dtos/list-user.dto';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class FindUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute({ ...paginate }: ListUserInput): Promise<ListUserOutput> {
    return this.userRepository.find(new Paginate(paginate));
  }
}
