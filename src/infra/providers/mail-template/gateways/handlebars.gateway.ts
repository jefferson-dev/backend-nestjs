import { Inject, Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { ParseInput, ParseOutput } from '../types/parse';
import { IMailTemplateProvider } from '../interface/IMailTemplateProvider';

@Injectable()
export class HandlebarGateway implements IMailTemplateProvider {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
  ) {}

  public async parse({ template, variables }: ParseInput): Promise<ParseOutput> {
    const templateFileContent = await promises.readFile(resolve(__dirname, '..', 'templates', `${template}.hbs`), {
      encoding: 'utf-8',
    });

    const parseTemplate = compile(templateFileContent);

    return parseTemplate({
      ...variables,
      FRONT_BASE_URL: this.config.app.frontWebUrl,
      AWS_BUCKET_NAME: this.config.aws.bucketName,
    });
  }
}
