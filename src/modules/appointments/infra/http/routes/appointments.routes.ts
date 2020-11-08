import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuth);

const controller = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.get('/', controller.all);
appointmentsRouter.post('/', controller.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
