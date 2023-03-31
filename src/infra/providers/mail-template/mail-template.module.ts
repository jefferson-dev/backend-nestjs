import { Module } from '@nestjs/common';
import { IMailTemplateProvider } from './interface/IMailTemplateProvider';
import { HandlebarGateway } from './gateways/handlebars.gateway';
import { MailTemplateProvider } from './service/mail-template.service';

@Module({
  providers: [{ provide: IMailTemplateProvider, useClass: MailTemplateProvider }, HandlebarGateway],
  exports: [{ provide: IMailTemplateProvider, useClass: MailTemplateProvider }, HandlebarGateway],
})
export class MailTemplateModule {}
