import { parseISO } from 'date-fns';
import { Router } from 'express';
import CreateAppointmentService from '../service/CreateAppointmentService';
import GetAllAppointments from '../service/GetAllAppointments';
import ensureAuth from '../middleware/ensureAuth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.get('/', async (req, res) => {
  const allAppointments = new GetAllAppointments();
  return res.json(await allAppointments.execute());
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);
  const createAppointmentService = new CreateAppointmentService();
  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
