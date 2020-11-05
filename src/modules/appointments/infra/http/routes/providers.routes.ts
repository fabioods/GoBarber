import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRouter = Router();
providersRouter.use(ensureAuth);

const controller = new ProvidersController();

providersRouter.get('/', controller.index);

export default providersRouter;
