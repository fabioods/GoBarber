import { Response, Request } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id: req.user.id });
    delete user.password;
    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, oldPassword } = req.body;
    const updateProfileService = container.resolve(UpdateProfileService);
    const user = await updateProfileService.execute({
      name,
      email,
      password,
      oldPassword,
      user_id,
    });
    delete user.password;

    return res.json(user);
  }
}
