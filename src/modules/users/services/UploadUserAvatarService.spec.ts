import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UploadUserAvatarService from './UploadUserAvatarService';

describe('UploadUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const uploadUserAvatarService = new UploadUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Fábio',
      email: 'fah_ds@live.com',
      password: '123456',
    });

    await uploadUserAvatarService.execute({
      user_id: user.id,
      user_file_name: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update user avatar from non-existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const uploadUserAvatarService = new UploadUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await fakeUsersRepository.create({
      name: 'Fábio',
      email: 'fah_ds@live.com',
      password: '123456',
    });

    expect(
      uploadUserAvatarService.execute({
        user_id: '1',
        user_file_name: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const uploadUserAvatarService = new UploadUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Fábio',
      email: 'fah_ds@live.com',
      password: '123456',
    });

    await uploadUserAvatarService.execute({
      user_id: user.id,
      user_file_name: 'avatar.jpg',
    });

    await uploadUserAvatarService.execute({
      user_id: user.id,
      user_file_name: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
