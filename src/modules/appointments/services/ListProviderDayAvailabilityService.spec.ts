import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointment.execute({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: '123456',
    });

    await createAppointment.execute({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: '123456',
    });

    const list = await listProviderAvailabilityService.execute({
      provider_id: '123456',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(list).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
