import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repository/AppointmentsRepository';

class GelAllAppointments {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute(): Appointment[] {
    return this.appointmentsRepository.all();
  }
}

export default GelAllAppointments;
