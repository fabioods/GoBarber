import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../model/User';
import upload from '../config/upload';

interface Request {
  user_id: string;
  user_file_name: string;
}

export default class UploadUserAvatarService {
  public async execute({ user_id, user_file_name }: Request): Promise<User> {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('User not authenticated');
    }

    if (user.avatar) {
      const fileName = path.join(upload.directory, user.avatar);
      const fileExists = await fs.promises.stat(fileName);
      if (fileExists) {
        await fs.promises.unlink(fileName);
      }
    }

    user.avatar = user_file_name;

    await userRepo.save(user);

    return user;
  }
}
