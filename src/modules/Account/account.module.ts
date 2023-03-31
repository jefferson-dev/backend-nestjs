import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from '@infra/providers/token';
import { CryptographyModule } from '@infra/providers/cryptography';
import { UserModule } from '@module/User/user.module';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { GetTracerId } from '@infra/middlewares/rTracer';
import { ILogger, LoggerService } from '@infra/providers/logger';
import { Account, AccountSchema } from './infra/schema/account.schema';
import { IAccountRepository } from './interfaces/account.interface';
import { AccountRepository } from './infra/repository/account.repository';
import { AuthenticateAccountService } from './services/authenticate.service';
import { AccountController } from './controllers/account.controller';
import { FindAccountService } from './services/find.service';
import { FindOneAccountService } from './services/find-one.service';
import { CreateAccountService } from './services/create.service';
import { UpdateAccountService } from './services/update.service';
import { DeleteAccountService } from './services/delete.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    CryptographyModule,
    TokenModule,
    UserModule,
  ],
  controllers: [AccountController],
  providers: [
    {
      provide: ILogger,
      inject: [EnvironmentVariables.KEY],
      useFactory: (config: EnvironmentVariablesType) => new LoggerService(config, 'Account', GetTracerId),
    },
    { provide: IAccountRepository, useClass: AccountRepository },
    JwtService,
    AuthenticateAccountService,
    FindAccountService,
    FindOneAccountService,
    CreateAccountService,
    UpdateAccountService,
    DeleteAccountService,
  ],
})
export class AccountModule {}
