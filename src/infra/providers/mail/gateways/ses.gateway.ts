import { Inject, Injectable } from '@nestjs/common';
import { SES } from 'aws-sdk';
import { createTransport, Transporter } from 'nodemailer';
import { IMailProvider } from '../interface/IMailProvider';
import { SendMailInput, SendMailOutput } from '../types/send-mail';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { IMailTemplateProvider } from '@infra/providers/mail-template';

@Injectable()
export class SesGateway implements IMailProvider {
  private transporter: Transporter;

  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly mailTemplatePrivider: IMailTemplateProvider,
  ) {
    this.transporter = createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: this.config.aws.region,
      }),
    });
  }

  public async sendMail({ to, subject, templateData }: SendMailInput): Promise<SendMailOutput> {
    await this.transporter.sendMail({
      from: {
        name: this.config.aws.mailName,
        address: this.config.aws.mailFrom,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplatePrivider.parse(templateData),
    });
  }
}
