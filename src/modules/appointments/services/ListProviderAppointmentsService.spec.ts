import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specified date', async () => {
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
    const user_id = '1';
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 1, 10, 12).getTime();
    });
    const app01 = await createAppointment.execute({
      date: new Date(2020, 4, 20, 14, 0, 0),
      provider_id: '123456',
      user_id,
    });

    const app02 = await createAppointment.execute({
      date: new Date(2020, 4, 20, 15, 0, 0),
      provider_id: '123456',
      user_id,
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const list = await listProviderAppointmentService.execute({
      provider_id: '123456',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(list).toEqual([app01, app02]);
  });
});
