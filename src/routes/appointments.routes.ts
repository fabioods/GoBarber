import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repository/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) =>
  res.json(appointmentsRepository.getAllAppointments()),
);

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return res.status(400).json({ message: 'This hour is already used' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return res.json(appointment);
});

export default appointmentsRouter;
