import { join } from 'node:path';
import { promises } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { IStorageProvider } from '../interface/IStorageProvider';
import { SendFileInput, SendFileOutput } from '../types/send-file';
import { DeleteFileInput, DeleteFileOutput } from '../types/delete-file';

export class DiskGateway implements IStorageProvider {
  public async saveFile({ context, file }: SendFileInput): Promise<SendFileOutput> {
    const hash = randomBytes(10).toString('hex');
    const filename = `${hash}-${file.originalname.replace(' ', '-')}`;

    await promises.writeFile(`${join(__dirname, '..', 'tmp')}/${context}/${filename}`, file.buffer);

    return {
      url: `http://localhost:3333/file/${context}/${filename}`,
    };
  }

  public async deleteFile({ context, file }: DeleteFileInput): Promise<DeleteFileOutput> {
    const filePath = join(__dirname, context, file);

    try {
      await promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}
