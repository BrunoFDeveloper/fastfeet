import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveredController {
  async index({ params }, res) {
    const checkDeliveryman = await Deliveryman.findByPk(params.id);
    if (!checkDeliveryman)
      return res.status(400).json({ error: 'Deliveryman does not exist!' });

    const orders = await Order.findAll({
      where: {
        deliveryman_id: params.id,
        canceled_at: null,
        start_date: {
          [Op.ne]: null,
        },
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new DeliveredController();
