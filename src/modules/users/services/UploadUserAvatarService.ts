import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import upload from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  user_file_name: string;
}
@injectable()
export default class UploadUserAvatarService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, user_file_name }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not authenticated');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(user_file_name);

    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}
