import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fábio Santos',
      email: 'fah_ds@Live.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Fábio',
      email: 'fabio@Live.com',
    });

    expect(updateUser.name).toBe('Fábio');
    expect(updateUser.email).toBe('fabio@Live.com');
  });

  it('should not be able to update the profile for a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: 'Fábio',
        email: 'fabio@Live.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fábio Santos',
      email: 'fah_ds@Live.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Jose',
      email: 'jose@Live.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Fábio',
        email: 'jose@Live.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fábio Santos',
      email: 'fah_ds@Live.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Fábio',
      email: 'fabio@Live.com',
      password: '123',
      oldPassword: '123456',
    });

    expect(updateUser.password).toBe('123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fábio Santos',
      email: 'fah_ds@Live.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Fábio',
        email: 'fah_ds@Live.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fábio Santos',
      email: 'fah_ds@Live.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Fábio',
        email: 'fah_ds@Live.com',
        password: '123',
        oldPassword: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
