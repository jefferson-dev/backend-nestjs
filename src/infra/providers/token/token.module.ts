import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTGateway } from './gateways/jwt.gateway';
import { ITokenProvider } from './interface/ITokenProvider';
import { TokenProvider } from './service/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [{ provide: ITokenProvider, useClass: TokenProvider }, JwtService, JWTGateway, JwtStrategy],
  exports: [{ provide: ITokenProvider, useClass: TokenProvider }, JwtService, JWTGateway, JwtStrategy],
})
export class TokenModule {}
