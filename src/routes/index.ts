import { Router } from 'express';
import appointmetsRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionRouter from './sessions.routes';

const routes = Router();
routes.use('/appointments', appointmetsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
