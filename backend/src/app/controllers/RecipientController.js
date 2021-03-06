import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index({ query: { q, id } }, res) {
    const recipients = await Recipient.findAll({
      ...(q
        ? {
            where: {
              name: {
                [Op.iLike]: `%${q}%`,
              },
            },
          }
        : {}),
      ...(id
        ? {
            where: {
              id,
            },
          }
        : {}),
    });

    return res.json(recipients);
  }

  async store({ body }, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(body)))
      return res.status(400).json({ error: 'Validation is not valid' });

    const recipient = await Recipient.create(body);
    return res.json(recipient);
  }

  async update({ body, params }, res) {
    const recipient = await Recipient.findByPk(params.id);

    if (!recipient)
      return res.status(401).json({ error: 'Recipient not found ' });

    const updated = await recipient.update(body);

    return res.json(updated);
  }
}

export default new RecipientController();
