import { Module } from '@nestjs/common';
import { MailTemplateModule } from '@infra/providers/mail-template';
import { IMailProvider } from './interface/IMailProvider';
import { EtherealGateway } from './gateways/ethereal.gateway';
import { SesGateway } from './gateways/ses.gateway';
import { MailProvider } from './service/mail.service';

@Module({
  imports: [MailTemplateModule],
  providers: [{ provide: IMailProvider, useClass: MailProvider }, EtherealGateway, SesGateway],
  exports: [{ provide: IMailProvider, useClass: MailProvider }, EtherealGateway, SesGateway],
})
export class MailModule {}
