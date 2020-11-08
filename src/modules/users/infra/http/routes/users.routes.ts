import { Router } from 'express';
import multer from 'multer';
import upload from '@config/upload';
import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';

const userRouter = Router();
const multerConfig = multer(upload);
const userController = new UsersController();

userRouter.post('/', userController.create);

userRouter.patch(
  '/avatar',
  ensureAuth,
  multerConfig.single('avatar'),
  userController.uploadAvatar,
);

export default userRouter;
