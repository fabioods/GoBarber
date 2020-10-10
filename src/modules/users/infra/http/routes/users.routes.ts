import { Router } from 'express';
import multer from 'multer';
import upload from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

const userRouter = Router();
const multerConfig = multer(upload);

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = container.resolve(CreateUserService);

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuth,
  multerConfig.single('avatar'),
  async (req, res) => {
    const uploadAvatar = container.resolve(UploadUserAvatarService);
    const user = await uploadAvatar.execute({
      user_id: req.user.id,
      user_file_name: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  },
);

export default userRouter;
