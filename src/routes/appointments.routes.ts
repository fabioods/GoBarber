import { parseISO } from 'date-fns';
import { Router } from 'express';
import AppointmentsRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';
import GetAllAppointments from '../service/GetAllAppointments';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const allAppointments = new GetAllAppointments(appointmentsRepository);
  return res.json(allAppointments.execute());
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;
