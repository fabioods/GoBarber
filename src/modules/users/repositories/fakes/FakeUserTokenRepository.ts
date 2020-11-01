import User from '@modules/users/infra/typeorm/entities/User';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class FakeUserTokenRepository implements IUserTokenRepository {
  private usersToken: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.usersToken.find(u => u.token === token);
    return user;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.usersToken.push(userToken);
    return userToken;
  }
}
