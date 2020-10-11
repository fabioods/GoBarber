import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  password: string;
  email: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, password, email }: IRequest): Promise<User> {
    const checkIfUserExists = await this.userRepository.findByEmail(email);

    if (checkIfUserExists) {
      throw new AppError('This email is already used');
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      password: passwordHash,
      email,
    });

    return user;
  }
}
