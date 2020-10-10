import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuth);

const controller = new AppointmentsController();

appointmentsRouter.get('/', controller.all);
appointmentsRouter.post('/', controller.create);

export default appointmentsRouter;
