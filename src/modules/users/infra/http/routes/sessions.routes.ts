import { Router } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const userRepository = new UsersRepository();
  const createSession = new CreateSessionService(userRepository);

  const { user, token } = await createSession.execute({ email, password });

  delete user.password;

  return res.json({ user, token });
});

export default sessionRouter;
