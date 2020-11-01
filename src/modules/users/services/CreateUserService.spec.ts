import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Fábio',
      password: '123456',
      email: 'fah_ds@Live.com',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('fah_ds@Live.com');
    expect(user.name).toBe('Fábio');
  });

  it('should not be able to create a new user with same email from another user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Fábio',
      password: '123456',
      email: 'fah_ds@Live.com',
    });

    await expect(
      createUser.execute({
        name: 'Fábio',
        password: '123456',
        email: 'fah_ds@Live.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
