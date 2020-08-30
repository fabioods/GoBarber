import { parseISO } from 'date-fns';
import { Router } from 'express';
import AppointmentsRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) =>
  res.json(appointmentsRepository.all()),
);

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
