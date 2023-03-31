import { Inject, Injectable } from '@nestjs/common';
import { Transporter, createTransport, createTestAccount, getTestMessageUrl } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { IMailProvider } from '../interface/IMailProvider';
import { SendMailInput, SendMailOutput } from '../types/send-mail';
import { IMailTemplateProvider } from '@infra/providers/mail-template';

@Injectable()
export class EtherealGateway implements IMailProvider {
  private transporter: Transporter<SentMessageInfo>;

  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly mailTemplatePrivider: IMailTemplateProvider,
  ) {
    createTestAccount().then((account) => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.transporter = transporter;
    });
  }

  public async sendMail({ to, subject, templateData }: SendMailInput): Promise<SendMailOutput> {
    const mail = await this.transporter.sendMail({
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

    console.log('Message sent: %s', mail.messageId);
    console.log('Preview URL: %s', getTestMessageUrl(mail));
  }
}
