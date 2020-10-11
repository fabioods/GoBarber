import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import GelAllAppointmentsService from './GelAllAppointmentsService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const date = new Date();
    const appointment = await createAppointment.execute({
      date,
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments in the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const date = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      date,
      provider_id: '123456',
    });

    expect(
      createAppointment.execute({
        date,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to return all appointments', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const getAppointments = new GelAllAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appointment01 = await createAppointment.execute({
      date: new Date(2020, 4, 12, 11),
      provider_id: '123456',
    });

    const appointment02 = await createAppointment.execute({
      date: new Date(2020, 4, 12, 15),
      provider_id: '123456',
    });

    const appointments = await getAppointments.execute();

    expect([appointment01, appointment02]).toEqual(appointments);
  });

  it('should not be able to return all appointments', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const getAppointments = new GelAllAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appointment01 = await createAppointment.execute({
      date: new Date(2020, 4, 12, 11),
      provider_id: '123456',
    });

    await createAppointment.execute({
      date: new Date(2020, 4, 12, 15),
      provider_id: '123456',
    });

    const appointments = await getAppointments.execute();

    expect([appointment01]).not.toEqual(appointments);
  });
});
