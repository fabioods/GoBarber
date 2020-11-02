import { Router } from 'express';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuth);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
