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
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({
      provider,
      date: parsedDate,
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;
