import { MailTemplateEnum } from '@infra/providers/mail-template';

type IMailContact = {
  name: string;
  email: string;
};

type MailTemplate = {
  template: MailTemplateEnum;
  variables?: Record<string, any>;
};

export type SendMailInput = {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: MailTemplate;
};

export type SendMailOutput = void;
