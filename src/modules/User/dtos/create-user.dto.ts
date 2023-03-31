import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCPFOrCNPJ } from 'brazilian-class-validator';
import { UserData } from '../infra/entity/user';

export class CreateUserInput {
  @IsString({ message: 'O campo nome é inválido.' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  name: string;

  @IsOptional()
  @IsString({ message: 'O campo tipo de documento é inválido.' })
  document_type?: string;

  @IsOptional()
  @IsString({ message: 'O campo numero do documento é inválido.' })
  @IsCPFOrCNPJ({ message: 'O campo numero do documento deve ser um CPF ou CNPJ válido' })
  document_number?: string;

  @IsOptional()
  @IsString({ message: 'O campo data de aniversário é inválido.' })
  birth_date?: Date;

  @IsOptional()
  @IsString({ message: 'O campo rua é inválido.' })
  street?: string;

  @IsOptional()
  @IsString({ message: 'O campo numero é inválido.' })
  street_number?: number;

  @IsOptional()
  @IsString({ message: 'O campo complemento é inválido.' })
  complement?: string;

  @IsOptional()
  @IsString({ message: 'O campo cep é inválido.' })
  zipcode?: string;

  @IsOptional()
  @IsString({ message: 'O campo bairro é inválido.' })
  district?: string;

  @IsOptional()
  @IsString({ message: 'O campo cidade é inválido.' })
  city?: string;

  @IsOptional()
  @IsString({ message: 'O campo estado é inválido.' })
  state?: string;

  @IsOptional()
  @IsString({ message: 'O campo telefone é inválido.' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'O campo avatar é inválido.' })
  avatar?: string;

  @IsOptional()
  @IsString({ message: 'O campo cover é inválido.' })
  cover?: string;
}

export type CreateUserOutput = UserData;
