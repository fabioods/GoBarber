import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
providersRouter.use(ensureAuth);

const controller = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.get('/', controller.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
    }),
  }),
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
    }),
  }),
  providerDayAvailabilityController.index,
);

export default providersRouter;
