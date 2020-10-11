import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storageFiles: string[] = [];

  public async saveFile(filePath: string): Promise<string> {
    this.storageFiles.push(filePath);
    return filePath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    this.storageFiles = this.storageFiles.filter(file => file !== filePath);
  }
}
