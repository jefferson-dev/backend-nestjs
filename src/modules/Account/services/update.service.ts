import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { ICryptographyProvider } from '@infra/providers/cryptography';
import { UpdateAccountInput, UpdateAccountOutput } from '../dtos/update-account.dto';
import { Account } from '../infra/entity/account';
import { IAccountRepository } from '../interfaces/account.interface';

@Injectable()
export class UpdateAccountService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly cryptographyProvider: ICryptographyProvider,
  ) {}

  public async execute(_id: string, data: UpdateAccountInput): Promise<UpdateAccountOutput> {
    const account = new Account(data);

    const accountExists = await this.accountRepository.findById(_id, { password: true });

    if (!accountExists) {
      throw new NotFoundException([AppMessage.ACCOUNT_NOT_FOUND]);
    }

    const emailExists = await this.accountRepository.findByEmail(data.email);

    if (emailExists && emailExists._id !== _id) {
      throw new BadRequestException([AppMessage.ACCOUNT_EMAIL_EXISTS]);
    }

    const matchPassword = await this.cryptographyProvider.compare({
      password: data.oldPassword,
      hash: accountExists.password,
    });

    if (!matchPassword) {
      throw new UnauthorizedException([AppMessage.ACCOUNT_UPDATE_PASSWORD_INVALID]);
    }

    await this.accountRepository.save(_id, {
      ...account,
      password: await this.cryptographyProvider.encrypt({ password: account.password }),
    });
  }
}
