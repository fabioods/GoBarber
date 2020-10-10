import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  password: string;
  email: string;
}

export default class CreateUserService {
  public async execute({ name, password, email }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkIfUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkIfUserExists) {
      throw new AppError('This email is already used');
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      password: passwordHash,
      email,
    });

    await userRepository.save(user);

    return user;
  }
}
