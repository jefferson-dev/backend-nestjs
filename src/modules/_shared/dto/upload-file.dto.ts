import { ContextUserEnum, ContextEventEnum } from '../enums/context.enum';

export type UploadFileInput = {
  context: ContextUserEnum | ContextEventEnum;
  file: Express.Multer.File;
};

export type UploadFileOutput = {
  url: string;
};
