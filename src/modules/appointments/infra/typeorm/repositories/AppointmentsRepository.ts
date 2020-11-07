import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findDate = await this.ormRepository.findOne({ where: { date } });
    return findDate;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async find(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  public async findAllInMonthFromProvider({
    month,
    year,
    provider_id,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = month.toString().padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY) = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    year,
    provider_id,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = month.toString().padStart(2, '0');
    const parsedDay = day.toString().padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY) = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }
}

export default AppointmentsRepository;
