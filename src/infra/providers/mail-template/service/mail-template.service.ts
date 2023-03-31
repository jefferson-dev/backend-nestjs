import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { HandlebarGateway } from '../gateways/handlebars.gateway';

@Injectable()
export class MailTemplateProvider {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly handlebarGateway: HandlebarGateway,
  ) {
    const provider = {
      handlebar: this.handlebarGateway,
    };

    return provider[this.config.app.driver.mailTemplateDriver];
  }
}
