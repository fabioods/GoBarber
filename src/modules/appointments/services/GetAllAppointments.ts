import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

class GelAllAppointments {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute(): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.find();
    return appointments;
  }
}

export default GelAllAppointments;
