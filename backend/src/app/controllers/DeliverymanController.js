import { Op } from 'sequelize';
import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index({ query: { q, id } }, res) {
    const deliverys = await Deliveryman.findAll({
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
      include: [
        { model: File, as: 'avatar', attributes: ['url', 'id', 'path'] },
      ],
      attributes: ['id', 'name', 'email'],
    });
    return res.json(deliverys);
  }

  async store({ body }, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(body)))
      return res.status(400).json({ error: 'Validation is not valid' });

    const checkDelivery = await Deliveryman.findOne({
      where: { email: body.email },
    });

    if (checkDelivery)
      return res.status(400).json({ error: 'Deliveryman already exist!' });

    const courier = await Deliveryman.create(body);
    return res.json(courier);
  }

  async update({ body, params }, res) {
    const checkDelivery = await Deliveryman.findByPk(params.deliveryId);

    if (!checkDelivery)
      return res.status(400).json({ error: 'User does not exist' });

    const updated = await checkDelivery.update(body);
    return res.json(updated);
  }

  async delete({ params }, res) {
    const delivery = await Deliveryman.destroy({
      where: { id: params.deliveryId },
    });
    return res.json({ message: 'Deliveryman deleted', delivery });
  }
}

export default new DeliverymanController();
