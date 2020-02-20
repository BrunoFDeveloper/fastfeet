import React, { useState, useEffect, Fragment } from 'react';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, TopContent } from './styles';

import Table from '~/components/Table/Table';
import PopUp from '~/components/PopUp/PopUp';
import Input from '~/components/Input/Input';
import Button from '~/components/Button/Button';

export default function Deliveryman() {
  const [deliveryman, setDeliveryman] = useState([]);
  function handleDelete(id) {}
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
      <h2>Gerenciando encomendas</h2>

      <TopContent>
        <Input
          bg="#fff"
          height={30}
          type="text"
          placeholder="Buscar por entregadores"
        />
        <Button>
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
                <img src={man.avatar.url} alt={man.name} />
              </td>
              <td>{man.name}</td>
              <td>{man.email}</td>
              <td>
                <PopUp>
                  <button>
                    <FaPen size={10} color="#BAD2FF" />
                    Editar
                  </button>
                  <button onClick={() => handleDelete(man.id)}>
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
