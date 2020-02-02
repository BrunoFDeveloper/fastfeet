import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    const { newOrder } = data;
    await Mail.sendMail({
      to: `${newOrder.name} <${newOrder.email}>`,
      subject: 'Nova entrega disponível',
      template: 'neworder',
      context: {
        name: newOrder.name,
        product: newOrder.product,
      },
    });
  }
}

export default new NewOrderMail();
