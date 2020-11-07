import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate, getHours } from 'date-fns';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProvidersDayAvalabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id, month, year, day },
    );

    const hourStar = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStar,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentsInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );
      return { hour, available: !hasAppointmentsInHour };
    });

    return availability;
  }
}
