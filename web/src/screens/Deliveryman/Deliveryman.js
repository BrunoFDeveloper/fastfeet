import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, TopContent } from './styles';

import Table from '~/components/Table/Table';
import PopUp from '~/components/PopUp/PopUp';
import Input from '~/components/Input/Input';
import Button from '~/components/Button/Button';

export default function Deliveryman({ history }) {
  const [deliveryman, setDeliveryman] = useState([]);

  async function handleDelete(id) {
    try {
      await api.delete(`/couriers/${id}`);
      toast.success('Entregador removido com sucesso!');

      const data = deliveryman.filter(man => man.id !== id);
      setDeliveryman(data);
    } catch (error) {
      toast.error('Erro ao tentar remover entregador!');
    }
  }

  useEffect(() => {
    async function getDevileryman() {
      try {
        const response = await api.get('couriers');
        setDeliveryman(response.data);
      } catch (error) {
        toast.error('Erro ao listar os entregadors!');
      }
    }

    getDevileryman();
  }, []);

  return (
    <Container>
      <h2>Gerenciando entregadores</h2>

      <TopContent>
        <Input
          bg="#fff"
          height={30}
          type="text"
          placeholder="Buscar por entregadores"
        />
        <Button onClick={() => history.push('/deliveryman/new')}>
          <FaPlus size={20} color="#FFF" />
          Cadastrar
        </Button>
      </TopContent>

      <Table titles={['ID', 'Foto', 'Nome', 'Email', 'Ações']}>
        {deliveryman.map(man => (
          <Fragment key={man.id}>
            <tr>
              <td>#{man.id}</td>
              <td>
                <img
                  src={man.avatar.url}
                  alt={man.name}
                  data-testid="userImage"
                />
              </td>
              <td>{man.name}</td>
              <td>{man.email}</td>
              <td>
                <PopUp>
                  <button
                    type="button"
                    onClick={() => history.push(`/deliveryman/new/${man.id}`)}
                  >
                    <FaPen size={10} color="#BAD2FF" />
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(man.id)}>
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
    </Container>
  );
}

Deliveryman.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
