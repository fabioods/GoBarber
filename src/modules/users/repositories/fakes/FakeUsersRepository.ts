import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IFindAllProviders from '@modules/appointments/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create({
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), email, password, name });
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findUserIndex = this.users.findIndex(u => u.id === user.id);
    this.users[findUserIndex] = user;
    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProviders): Promise<User[]> {
    const { users } = this;
    if (except_user_id) return users.filter(user => user.id !== except_user_id);
    return users;
  }
}

export default UsersRepository;
