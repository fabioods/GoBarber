import ISendMailDto from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDto[] = [];

  public async sendMail(message: ISendMailDto): Promise<void> {
    this.messages.push(message);
  }
}
