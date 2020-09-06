import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';

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
      throw new Error('This email is already used');
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
