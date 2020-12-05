import { Response, Request } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import GelAllAppointmentsService from '@modules/appointments/services/GelAllAppointmentsService';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;
    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );
    const appointment = await createAppointmentService.execute({
      provider_id,
      date,
      user_id,
    });
    return response.json(appointment);
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const allAppointments = container.resolve(GelAllAppointmentsService);
    return response.json(await allAppointments.execute());
  }
}
