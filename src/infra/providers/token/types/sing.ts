import { RoleEnum } from '@module/_shared/enums/role.enum';

export type SingInput = {
  data: {
    id?: string;
    email: string;
    role?: RoleEnum;
    isActive: boolean;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
};

export type SingOutput = string;
