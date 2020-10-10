import { parseISO } from 'date-fns';
import { Router } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import GetAllAppointments from '@modules/appointments/services/GetAllAppointments';
import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = new AppointmentRepository();
  const allAppointments = new GetAllAppointments(appointmentRepository);
  return res.json(await allAppointments.execute());
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const appointmentRepository = new AppointmentRepository();
  const parsedDate = parseISO(date);
  const createAppointmentService = new CreateAppointmentService(
    appointmentRepository,
  );
  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
