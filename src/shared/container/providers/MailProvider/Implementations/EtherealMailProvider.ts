import nodemailer, { Transporter } from 'nodemailer';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import ISendMailDto from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount((err, account) => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDto): Promise<void> {
    const message = {
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipegobarber@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    };
    const email = await this.client.sendMail(message);
    console.log('Message sent: %s', email.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(email));
  }
}
