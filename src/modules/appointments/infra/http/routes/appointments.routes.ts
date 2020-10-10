import { parseISO } from 'date-fns';
import { Router } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import GelAllAppointmentsService from '@modules/appointments/services/GelAllAppointmentsService';
import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.get('/', async (req, res) => {
  const allAppointments = container.resolve(GelAllAppointmentsService);
  return res.json(await allAppointments.execute());
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);
  const createAppointmentService = container.resolve(CreateAppointmentService);
  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
