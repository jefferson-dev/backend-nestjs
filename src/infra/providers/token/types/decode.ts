import { RoleEnum } from '@module/_shared/enums/role.enum';
import { JwtPayload } from 'jsonwebtoken';

export type DecodeInput = {
  jwtSecret: string;
  token: string;
};

export interface DecodeOutput extends JwtPayload {
  data: {
    id: string;
    email: string;
    name: string;
    role: RoleEnum;
  };
}
