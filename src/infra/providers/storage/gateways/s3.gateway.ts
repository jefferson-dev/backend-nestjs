import { Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomBytes } from 'crypto';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { IStorageProvider } from '../interface/IStorageProvider';
import { SendFileInput, SendFileOutput } from '../types/send-file';
import { DeleteFileInput, DeleteFileOutput } from '../types/delete-file';

@Injectable()
export class S3Gateway implements IStorageProvider {
  private client: S3;

  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
  ) {
    this.client = new S3({
      region: config.aws.region,
    });
  }

  public async saveFile({ context, file }: SendFileInput): Promise<SendFileOutput> {
    const hash = randomBytes(10).toString('hex');
    const filename = `${hash}-${file.originalname.replace(' ', '-')}`;

    await this.client
      .putObject({
        Bucket: `${this.config.aws.bucketName}/${context}`,
        Key: filename,
        // ACL: 'public-read',
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    return {
      url: `https://${this.config.aws.bucketName}.s3.amazonaws.com/${context}/${filename}`,
    };
  }

  public async deleteFile({ context, file }: DeleteFileInput): Promise<DeleteFileOutput> {
    await this.client
      .deleteObject({
        Bucket: `${this.config.aws.bucketName}/${context}`,
        Key: file,
      })
      .promise();
  }
}
