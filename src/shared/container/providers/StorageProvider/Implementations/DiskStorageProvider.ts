import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(filePath: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, filePath),
      path.resolve(uploadConfig.uploadFolder, filePath),
    );
    return filePath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    const file = path.resolve(uploadConfig.uploadFolder, filePath);
    try {
      await fs.promises.stat(file);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(file);
  }
}
