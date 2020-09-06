import { Router } from 'express';
import appointmetsRouter from './appointments.routes';
import userRouter from './users.routes';

const routes = Router();
routes.use('/appointments', appointmetsRouter);
routes.use('/users', userRouter);

export default routes;
