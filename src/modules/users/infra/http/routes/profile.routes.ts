import { Router } from 'express';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import { celebrate, Joi, Segments } from 'celebrate';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuth);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      password_confirm: Joi.string().valid(Joi.ref('password')),
      oldPassword: Joi.string(),
    }),
  }),
  profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
