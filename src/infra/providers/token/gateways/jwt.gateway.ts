import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenProvider } from '../interface/ITokenProvider';
import { DecodeInput, DecodeOutput } from '../types/decode';
import { SingInput, SingOutput } from '../types/sing';

@Injectable()
export class JWTGateway implements ITokenProvider {
  constructor(private readonly jwtService: JwtService) {}

  public async sing({ data, jwt }: SingInput): Promise<SingOutput> {
    return this.jwtService.sign(
      {
        data: {
          id: data.id,
          email: data.email,
          role: data.role,
        },
      },
      {
        secret: jwt.secret,
        expiresIn: jwt.expiresIn,
      },
    );
  }

  public async decode(data: DecodeInput): Promise<DecodeOutput> {
    return this.jwtService.verify(data.token, { secret: data.jwtSecret }) as DecodeOutput;
  }
}
