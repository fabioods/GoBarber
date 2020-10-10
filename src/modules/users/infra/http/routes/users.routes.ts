import { Router } from 'express';
import multer from 'multer';
import upload from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import ensureAuth from '@modules/users/infra/http/middleware/ensureAuth';

const userRouter = Router();
const multerConfig = multer(upload);

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuth,
  multerConfig.single('avatar'),
  async (req, res) => {
    const uploadAvatar = new UploadUserAvatarService();
    const user = await uploadAvatar.execute({
      user_id: req.user.id,
      user_file_name: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  },
);

export default userRouter;
