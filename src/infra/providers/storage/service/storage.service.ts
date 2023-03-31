import { Inject, Injectable } from '@nestjs/common';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { DiskGateway } from '../gateways/disk.gateway';
import { S3Gateway } from '../gateways/s3.gateway';

@Injectable()
export class StorageProvider {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly diskGateway: DiskGateway,
    private readonly s3Gateway: S3Gateway,
  ) {
    const provider = {
      disk: this.diskGateway,
      s3: this.s3Gateway,
    };

    return provider[this.config.app.driver.storageDriver];
  }
}
