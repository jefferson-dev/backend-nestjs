import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAccountInput {
  @IsString({ message: 'O campo nome é inválido.' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  name: string;

  @IsString({ message: 'O campo e-mail é inválido.' })
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'O campo senha é inválido.' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  @MinLength(8, { message: 'É necessário ter pelo menos 8 digitos' })
  password: string;
}

export type CreateAccountOutput = void;
