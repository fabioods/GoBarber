import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specified date', async () => {
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
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
