import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();

    const formattedUsers = users.map(({ id, name, email }) => ({
      id,
      name,
      email,
    }));

    return res.json(formattedUsers);
  }

  async store({ body }, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(body)))
      return res.status(400).json({ error: 'Validation is not valid' });

    const userExists = await User.findOne({ where: { email: body.email } });

    if (userExists)
      return res.status(400).json({ error: 'User already exist' });

    const { name, email } = await User.create(body);

    return res.json({ name, email });
  }
  async update() {}
}

export default new UserController();
