import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fábio Santos',
      email: 'fah_ds@Live.com',
      password: '123456',
    });

    const showUser = await showProfileService.execute({ user_id: user.id });

    expect(showUser.name).toBe('Fábio Santos');
    expect(showUser.email).toBe('fah_ds@Live.com');
  });

  it('should not be able to show the profile when user does not exist', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
