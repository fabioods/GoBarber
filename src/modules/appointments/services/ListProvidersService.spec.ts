import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviderService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Fábio Santos',
      email: 'fabio.santos@Live.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Fábio Ribeiro',
      email: 'fabio.ribeiro@Live.com',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged user',
      email: 'logged@Live.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
