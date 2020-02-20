import React, { useEffect, useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaPen, FaTrash, FaPlus } from 'react-icons/fa';

import api from '~/services/api';

import { Container, TopContent } from './styles';
import Table from '~/components/Table/Table';
import Badge from '~/components/Badge/Badge';
import PopUp from '~/components/PopUp/PopUp';
import Input from '~/components/Input/Input';
import Button from '~/components/Button/Button';
import Modal from '~/components/Modal/Modal';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState({ show: false, data: {} });

  async function handleDelete(id) {
    const answer = window.confirm('Deseja deletar essa encomenda?');
    if (answer) {
      await api.delete(`orders/${id}`);

      const newOrders = orders.filter(order => order.id !== id);

      setOrders(newOrders);

      toast.success('Encomenda deletada com sucesso!');
    }
  }

  function handleModal(item) {
    setModal({ show: !modal.show, data: item });
  }

  useEffect(() => {
    async function getOrders() {
      const response = await api.get('orders');

      setOrders(response.data);
    }

    getOrders();
  }, []);

  return (
    <Container>
      <h2>Gerenciando encomendas</h2>

      <TopContent>
        <Input
          bg="#fff"
          height={30}
          type="text"
          placeholder="Buscar por encomendas"
        />
        <Button>
          <FaPlus size={20} color="#FFF" />
          Cadastrar
        </Button>
      </TopContent>

      <Table
        titles={[
          'ID',
          'Destinatário',
          'Entregador',
          'Cidade',
          'Estado',
          'Status',
          'Ações',
        ]}
      >
        {orders.map(order => (
          <Fragment key={order.id}>
            <tr>
              <td>#{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>{order.deliveryman.name}</td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>
                <Badge
                  width={110}
                  start={order.start_date}
                  end={order.end_date}
                  canceled={order.canceled_at}
                />
              </td>
              <td>
                <PopUp>
                  {order.end_date && (
                    <button type="button" onClick={() => handleModal(order)}>
                      <FaEye size={10} color="#7159c1" />
                      Visualizar
                    </button>
                  )}
                  <button type="button">
                    <FaPen size={10} color="#BAD2FF" />
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(order.id)}>
                    <FaTrash size={10} color="red" />
                    Excluir
                  </button>
                </PopUp>
              </td>
            </tr>
            <tr />
          </Fragment>
        ))}
      </Table>

      {modal.show && (
        <Modal closeModal={() => handleModal(null)}>
          <h3>Informações da encomenda</h3>
          <br />
          <p>
            {modal.data.recipient.street}, {modal.data.recipient.number}
          </p>
          <p>
            {modal.data.recipient.city} - {modal.data.recipient.state}
          </p>
          <p>{modal.data.recipient.cep}</p>
          <br />
          <hr />
          <br />
          <h3>Datas</h3>
          <br />
          <p>
            <strong>Retirada:</strong> {modal.data.start_date}
          </p>
          <p>
            <strong>Entrega:</strong> {modal.data.end_date}
          </p>
          <br />
          <hr />
          <br />
          <h3>Assinatura do destinatário</h3>
          <img src={modal.data?.signature?.url} alt="assinatura" />
        </Modal>
      )}
    </Container>
  );
}
