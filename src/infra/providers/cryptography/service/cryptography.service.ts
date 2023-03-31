import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { BCryptGateway } from '../gateways/bcrypt.gateway';

@Injectable()
export class CryptographyProvider {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly bCryptGateway: BCryptGateway,
  ) {
    const provider = {
      bcrypt: this.bCryptGateway,
    };

    return provider[this.config.app.driver.cryptographyDriver];
  }
}
