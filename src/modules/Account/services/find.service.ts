import { Injectable } from '@nestjs/common';
import { Paginate } from '@module/_shared/value-object/paginate';
import { ListAccountInput, ListAccountOutput } from '../dtos/list-account.dto';
import { IAccountRepository } from '../interfaces/account.interface';

@Injectable()
export class FindAccountService {
  constructor(private readonly accountRepository: IAccountRepository) {}

  public async execute({ ...paginate }: ListAccountInput): Promise<ListAccountOutput> {
    return this.accountRepository.find(new Paginate(paginate));
  }
}
