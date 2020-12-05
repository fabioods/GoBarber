import { Response, Request } from 'express';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProvidersAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;
    const listProviderService = container.resolve(
      ListProviderAppointmentsService,
    );
    const listProviders = await listProviderService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });
    return response.json(classToClass(listProviders));
  }
}
