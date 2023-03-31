import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AccountData } from '../infra/entity/account';

export class AuthenticateAccountInput {
  @IsEmail({}, { message: 'O campo e-mail é inválido.' })
  email: string;

  @IsString({ message: 'O campo senha é inválido.' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  password: string;
}

export type AuthenticateAccountOutput = {
  accessToken: string;
  account: AccountData;
};
