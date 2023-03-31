import { IsString, IsEmail, IsOptional, ValidateIf, MinLength } from 'class-validator';

export class UpdateAccountInput {
  @IsOptional()
  @IsString({ message: 'O campo e-mail é inválido.' })
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'O campo senha é inválido.' })
  @MinLength(8, { message: 'É necessário ter pelo menos 8 digitos' })
  password?: string;

  @ValidateIf(({ password }) => password !== undefined)
  @IsString({ message: 'O campo senha anterior é inválido.' })
  oldPassword?: string;
}

export type UpdateAccountOutput = void;
