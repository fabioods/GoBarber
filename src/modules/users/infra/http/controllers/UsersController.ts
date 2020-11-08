import { Response, Request } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });
    return res.json({ ...classToClass(user) });
  }

  public async uploadAvatar(req: Request, res: Response): Promise<Response> {
    const uploadAvatar = container.resolve(UploadUserAvatarService);
    const user = await uploadAvatar.execute({
      user_id: req.user.id,
      user_file_name: req.file.filename,
    });
    return res.json({ ...classToClass(user) });
  }
}
