import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { EtherealGateway } from '../gateways/ethereal.gateway';
import { SesGateway } from '../gateways/ses.gateway';

@Injectable()
export class MailProvider {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly etherealGateway: EtherealGateway,
    private readonly sesGateway: SesGateway,
  ) {
    const provider = {
      ethereal: this.etherealGateway,
      ses: this.sesGateway,
    };

    return provider[this.config.app.driver.mailDriver];
  }
}
