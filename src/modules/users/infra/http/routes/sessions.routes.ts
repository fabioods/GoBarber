import { Router } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const createSession = new CreateSessionService();

  const { user, token } = await createSession.execute({ email, password });

  delete user.password;

  return res.json({ user, token });
});

export default sessionRouter;
