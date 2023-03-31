import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AppMessage } from '@config/app-messages';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { AuthenticateAccountInput, AuthenticateAccountOutput } from '../dtos/authenticate-account.dto';
import { IAccountRepository } from '../interfaces/account.interface';
import { ICryptographyProvider } from '@infra/providers/cryptography';
import { ITokenProvider } from '@infra/providers/token';
import { RoleEnum } from '@module/_shared/enums/role.enum';

@Injectable()
export class AuthenticateAccountService {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly accountRepository: IAccountRepository,
    private readonly cryptographyProvider: ICryptographyProvider,
    private readonly tokenProvider: ITokenProvider,
  ) {}

  public async execute(data: AuthenticateAccountInput): Promise<AuthenticateAccountOutput> {
    const account = await this.accountRepository.findByEmail(data.email, { password: true });

    if (!account) throw new UnauthorizedException([AppMessage.AUTHENTICATE_ERROR]);

    if (!account.isActive) throw new UnauthorizedException([AppMessage.ACCOUNT_DISABLE]);

    const matchPassword = await this.cryptographyProvider.compare({
      password: data.password,
      hash: account.password,
    });

    if (!matchPassword) throw new UnauthorizedException([AppMessage.AUTHENTICATE_ERROR]);

    const accessToken = await this.tokenProvider.sing({
      data: {
        id: account._id,
        email: account.email,
        role: account.role as RoleEnum,
        isActive: account.isActive,
      },
      jwt: {
        secret: this.config.jwt.secret,
        expiresIn: this.config.jwt.expiresIn,
      },
    });

    return { account, accessToken };
  }
}
