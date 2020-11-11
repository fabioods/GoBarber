import cache from '@config/cache';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    day,
    month,
    year,
    provider_id,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('hello');
    console.log(cacheData);
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { day, month, year, provider_id },
    );
    // await this.cacheProvider.save('hello', 'world');
    return appointments;
  }
}
