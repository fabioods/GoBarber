import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}
const appointments = Array<Appointment>();
// const appointments: Appointment[] = [];

appointmentsRouter.get('/', (req, res) => res.json(appointments));

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return res.status(400).json({ message: 'This hour is already used' });
  }

  const appointment = { id: uuid(), provider, date: parsedDate };
  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
