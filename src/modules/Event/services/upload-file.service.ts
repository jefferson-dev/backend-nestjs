import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { EnvironmentVariables, EnvironmentVariablesType } from '@config/environment-variables';
import { IStorageProvider } from '@infra/providers/storage';
import { UploadFileInput, UploadFileOutput } from '@module/_shared/dto/upload-file.dto';
import { MimeTypeEnum } from '@module/_shared/enums/mime-type.enum';
import { AppMessage } from '@config/app-messages';

@Injectable()
export class UploadFileService {
  constructor(
    @Inject(EnvironmentVariables.KEY)
    private readonly config: EnvironmentVariablesType,
    private readonly storageProvider: IStorageProvider,
  ) {}

  public async execute({ context, file }: UploadFileInput): Promise<UploadFileOutput> {
    const maxFileSize = parseInt(this.config.app.uploadFileLimitSize) * 1024 * 1024;

    if (!Object.values(MimeTypeEnum).includes(file.mimetype as MimeTypeEnum)) {
      throw new NotAcceptableException([AppMessage.UPLOAD_FORMAT_INVALID]);
    }

    if (file.size > maxFileSize) {
      throw new NotAcceptableException([AppMessage.UPLOAD_LIMIT_SIZE]);
    }

    return this.storageProvider.saveFile({ context: `event/${context}`, file });
  }
}
