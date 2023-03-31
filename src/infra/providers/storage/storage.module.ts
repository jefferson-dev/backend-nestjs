import { Module } from '@nestjs/common';
import { IStorageProvider } from './interface/IStorageProvider';
import { S3Gateway } from './gateways/s3.gateway';
import { DiskGateway } from './gateways/disk.gateway';
import { StorageProvider } from './service/storage.service';

@Module({
  providers: [{ provide: IStorageProvider, useClass: StorageProvider }, DiskGateway, S3Gateway],
  exports: [{ provide: IStorageProvider, useClass: StorageProvider }, DiskGateway, S3Gateway],
})
export class StorageModule {}
