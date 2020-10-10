import { Router } from 'express';
import appointmetsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();
routes.use('/appointments', appointmetsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
