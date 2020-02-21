import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Queue from '../../lib/Queue';
import NewOrderMail from '../jobs/NewOrderMail';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class OrderController {
  async index({ query: { q, id } }, res) {
    const orders = await Order.findAll({
      ...(q
        ? {
            where: {
              product: {
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
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'id', 'email'],
        },
      ],
    });
    return res.json(orders);
  }

  async store({ body }, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(body)))
      return res.status(400).json({ error: 'Validation is not valid' });

    const order = await Order.create(body);
    const { id, product } = order;

    const orderData = await Order.findOne({
      where: { id },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'id', 'email'],
        },
      ],
    });

    await Queue.add(NewOrderMail.key, {
      newOrder: {
        name: orderData.deliveryman.name,
        product,
        email: orderData.deliveryman.email,
      },
    });

    return res.json(orderData);
  }

  async update({ body, params }, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(body)))
      return res.status(400).json({ error: 'Validation is not valid' });

    const order = await Order.findByPk(params.id);

    if (!order) return res.status(400).json({ error: 'Order does not exist' });

    const update = await order.update(body);

    return res.json(update);
  }

  async delete({ params }, res) {
    const order = await Order.destroy({ where: { id: params.id } });

    if (!order) return res.status(400).json({ error: 'Order does not exist' });

    return res.json(order);
  }
}

export default new OrderController();
