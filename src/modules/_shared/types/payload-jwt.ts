import { RoleEnum } from '../enums/role.enum';

export type AuthenticatedPayload = {
  id: string;
  email: string;
  role: RoleEnum;
  isActive: true;
  iat: number;
  exp: number;
};
