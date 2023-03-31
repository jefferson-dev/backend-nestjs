import { Injectable, BadRequestException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { ICryptographyProvider } from '@infra/providers/cryptography';
import { CreateUserService } from '@module/User/services/create.service';
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto';
import { Account } from '../infra/entity/account';
import { IAccountRepository } from '../interfaces/account.interface';

@Injectable()
export class CreateAccountService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly cryptographyProvider: ICryptographyProvider,
    private readonly createUserService: CreateUserService,
  ) {}

  public async execute(data: CreateAccountInput): Promise<CreateAccountOutput> {
    const account = new Account(data);

    const result = await this.accountRepository.findByEmail(account.email);

    if (result) throw new BadRequestException([AppMessage.ACCOUNT_EMAIL_EXISTS]);

    const user = await this.createUserService.execute({ name: data.name });

    await this.accountRepository.create({
      ...account,
      userId: user._id,
      password: await this.cryptographyProvider.encrypt({ password: account.password }),
    });
  }
}
