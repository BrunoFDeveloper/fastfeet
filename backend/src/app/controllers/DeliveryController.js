import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index({ params }, res) {
    const checkDeliveryman = await Deliveryman.findByPk(params.id);
    if (!checkDeliveryman)
      return res.status(400).json({ error: 'Deliveryman does not exist!' });

    const orders = await Order.findAll({
      where: {
        deliveryman_id: params.id,
        canceled_at: null,
        end_date: null,
      },
      attributes: ['id', 'product', 'created_at', 'start_date', 'end_date'],
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

  async update({ params, body }, res) {
    const order = await Order.findOne({
      where: { id: params.orderId, deliveryman_id: params.deliveryId },
    });

    if (!order) return res.status(400).json({ error: 'Order not found!' });

    const update = await order.update(body);

    return res.json(update);
  }
}

export default new DeliveryController();
