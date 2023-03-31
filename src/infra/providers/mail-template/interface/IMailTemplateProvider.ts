import { ParseInput, ParseOutput } from '../types/parse';

export abstract class IMailTemplateProvider {
  abstract parse(data: ParseInput): Promise<ParseOutput>;
}
