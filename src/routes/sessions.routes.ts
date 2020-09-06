import { Router } from 'express';
import CreateSessionService from '../service/CreateSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const createSession = new CreateSessionService();

  const { user } = await createSession.execute({ email, password });

  delete user.password;

  return res.json(user);
});

export default sessionRouter;
