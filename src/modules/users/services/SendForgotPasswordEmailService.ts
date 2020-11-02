import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}
@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GOBARBER] Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}} - {{token}}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
