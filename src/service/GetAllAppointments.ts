import { getCustomRepository } from 'typeorm';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repository/AppointmentsRepository';

class GelAllAppointments {
  public async execute(): Promise<Appointment[]> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return appointments;
  }
}

export default GelAllAppointments;
