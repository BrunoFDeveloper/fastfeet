import Mail from '../../lib/Mail';

class CancellationOrderMail {
  get key() {
    return 'CancellationOrderMail';
  }

  async handle({ data }) {
    const { cancel } = data;
    await Mail.sendMail({
      to: `${cancel.name} <${cancel.email}>`,
      subject: 'Sua entrega foi cancelada',
      template: 'cancelOrder',
      context: {
        name: cancel.name,
        product: cancel.product,
      },
    });
  }
}

export default new CancellationOrderMail();
