import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Queue from '../../lib/Queue';
import CancellationOrderMail from '../jobs/CancellationOrderMail';

class DeliveryProblemController {
  async index({ query: { orderId } }, res) {
    const problems = await DeliveryProblem.findAll({
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'product'],
          ...(orderId
            ? {
                where: {
                  id: orderId,
                },
              }
            : {}),
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['id', 'path', 'url'],
                },
              ],
            },
          ],
        },
      ],
      attributes: ['id', 'description', 'created_at'],
    });
    return res.json(problems);
  }

  async store({ body }, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(body)))
      return res.status(400).json({ error: 'Validation is not valid' });
    const checkOrder = await Order.findByPk(body.delivery_id);

    if (!checkOrder)
      return res.status(400).json({ error: 'Order does not exist!' });

    const problem = await DeliveryProblem.create(body);
    return res.json(problem);
  }

  async delete({ params }, res) {
    const checkProblem = await DeliveryProblem.findOne({
      where: { id: params.problemId },
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (!checkProblem)
      return res.status(400).json({ error: 'Problem not found!' });

    await checkProblem.destroy();

    await Queue.add(CancellationOrderMail.key, {
      cancel: {
        name: checkProblem.order.deliveryman.name,
        product: checkProblem.order.product,
        email: checkProblem.order.deliveryman.email,
      },
    });

    return res.json(checkProblem);
  }
}

export default new DeliveryProblemController();
