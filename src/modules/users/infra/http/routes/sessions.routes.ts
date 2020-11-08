import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionRouter = Router();
const sessionsController = new SessionsController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  sessionsController.create,
);

export default sessionRouter;
