import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import GelAllAppointmentsService from './GelAllAppointmentsService';

let createAppointmentService: CreateAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 1, 10, 12).getTime();
    });

    const date = new Date(2020, 4, 10, 13);
    const user_id = '1';
    const appointment = await createAppointmentService.execute({
      date,
      provider_id: '123456',
      user_id,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments in the same time', async () => {
    const user_id = '1';
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 1, 10, 12).getTime();
    });

    const date = new Date(2020, 4, 10, 11);
    await createAppointmentService.execute({
      date,
      provider_id: '123456',
      user_id,
    });

    await expect(
      createAppointmentService.execute({
        date,
        provider_id: '123456',
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return all appointments', async () => {
    const getAppointments = new GelAllAppointmentsService(
      fakeAppointmentsRepository,
    );
    const user_id = '1';
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 1, 10, 12).getTime();
    });
    const appointment01 = await createAppointmentService.execute({
      date: new Date(2020, 4, 12, 11),
      provider_id: '123456',
      user_id,
    });

    const appointment02 = await createAppointmentService.execute({
      date: new Date(2020, 4, 12, 15),
      provider_id: '123456',
      user_id,
    });

    const appointments = await getAppointments.execute();

    expect([appointment01, appointment02]).toEqual(appointments);
  });

  it('should not be able to return all appointments', async () => {
    const getAppointments = new GelAllAppointmentsService(
      fakeAppointmentsRepository,
    );
    const user_id = '1';
    const appointment01 = await createAppointmentService.execute({
      date: new Date(2020, 4, 12, 11),
      provider_id: '123456',
      user_id,
    });

    await createAppointmentService.execute({
      date: new Date(2020, 4, 12, 15),
      provider_id: '123456',
      user_id,
    });

    const appointments = await getAppointments.execute();

    expect([appointment01]).not.toEqual(appointments);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123456',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '123456',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: '123456',
        user_id: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: '123456',
        user_id: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
