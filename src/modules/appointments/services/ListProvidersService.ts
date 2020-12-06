import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
}
@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );
    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });
      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );
    }
    return users;
  }
}
