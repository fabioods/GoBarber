import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import upload from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  user_id: string;
  user_file_name: string;
}
@injectable()
export default class UploadUserAvatarService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, user_file_name }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not authenticated');
    }

    if (user.avatar) {
      const fileName = path.join(upload.directory, user.avatar);
      const fileExists = await fs.promises.stat(fileName);
      if (fileExists) {
        await fs.promises.unlink(fileName);
      }
    }

    user.avatar = user_file_name;

    await this.userRepository.save(user);

    return user;
  }
}
