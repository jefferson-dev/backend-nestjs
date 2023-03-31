import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppMessage } from '@config/app-messages';
import { AuthenticatedPayload } from '../types/payload-jwt';
import { RoleEnum } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());

    const account = context.switchToHttp().getRequest().user as AuthenticatedPayload;

    const roleValues: Record<RoleEnum, number> = {
      [RoleEnum.USER]: 0,
      [RoleEnum.ADMIN]: 1,
      [RoleEnum.DEV]: 2,
    };

    if (roleValues[account.role] >= roleValues[role]) return true;
    else throw new UnauthorizedException([AppMessage.ACCOUNT_UNAUTHORIZED]);
  }
}
