import { Response, Request } from 'express';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { container } from 'tsyringe';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listProviderService = container.resolve(ListProvidersService);
    const listProviders = await listProviderService.execute({
      user_id,
    });
    return response.json(listProviders);
  }
}
