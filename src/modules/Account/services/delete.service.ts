import { Injectable, NotFoundException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { IAccountRepository } from '../interfaces/account.interface';
import { DeleteUserService } from '@module/User/services/delete.service';

@Injectable()
export class DeleteAccountService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  public async execute(_id: string): Promise<void> {
    const customer = await this.accountRepository.findById(_id);

    if (!customer) throw new NotFoundException([AppMessage.ACCOUNT_NOT_FOUND]);

    await this.accountRepository.delete(customer._id);
    await this.deleteUserService.execute(customer.userId.toString());
  }
}
