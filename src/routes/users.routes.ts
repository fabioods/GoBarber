import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../service/CreateUserService';
import ensureAuth from '../middleware/ensureAuth';
import upload from '../config/upload';

const userRouter = Router();
const multerConfig = multer(upload);

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

userRouter.patch(
  '/avatar',
  ensureAuth,
  multerConfig.single('avatar'),
  (req, res) => {
    console.log(req.file);
    return res.json({ ok: true });
  },
);

export default userRouter;
