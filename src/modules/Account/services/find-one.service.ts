import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { AccountData } from '../infra/entity/account';
import { IAccountRepository } from '../interfaces/account.interface';

@Injectable()
export class FindOneAccountService {
  constructor(private readonly accountRepository: IAccountRepository) {}

  public async execute(_id: string): Promise<AccountData> {
    const result = await this.accountRepository.findById(_id);

    if (!result) throw new NotFoundException([AppMessage.ACCOUNT_NOT_FOUND]);

    return result;
  }
}
