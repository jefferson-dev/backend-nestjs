import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { AppMessage } from '@config/app-messages';
import { AuthenticatedPayload } from '../types/payload-jwt';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements IAuthGuard {
  handleRequest<Account extends AuthenticatedPayload>(_: Error, user: Account): Account {
    if (user) return user;
    else throw new UnauthorizedException([AppMessage.REQUEST_UNAUTHORIZED]);
  }
}
