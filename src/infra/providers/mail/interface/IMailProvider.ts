import { SendMailInput, SendMailOutput } from '../types/send-mail';

export abstract class IMailProvider {
  abstract sendMail(data: SendMailInput): Promise<SendMailOutput>;
}
