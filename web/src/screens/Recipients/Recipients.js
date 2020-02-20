import React, { useState, useEffect, Fragment } from 'react';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, TopContent } from './styles';

import Table from '~/components/Table/Table';
import PopUp from '~/components/PopUp/PopUp';
import Input from '~/components/Input/Input';
import Button from '~/components/Button/Button';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);

  function handleDelete(id) {}

  useEffect(() => {
    async function getRecipients() {
      try {
        const response = await api.get('recipients');
        setRecipients(response.data);
      } catch (error) {
        toast.error('Erro ao listar os destinatários!');
      }
    }

    getRecipients();
  }, []);

  return (
    <Container>
      <h2>Gerenciando destinatários</h2>

      <TopContent>
        <Input
          bg="#fff"
          height={30}
          type="text"
          placeholder="Buscar por destinatários"
        />
        <Button>
          <FaPlus size={20} color="#FFF" />
          Cadastrar
        </Button>
      </TopContent>

      <Table titles={['ID', 'Nome', 'Endereço', 'Ações']}>
        {recipients.map(recipient => (
          <Fragment key={recipient.id}>
            <tr>
              <td>#{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>
                {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                {recipient.state}
              </td>
              <td>
                <PopUp>
                  <button>
                    <FaPen size={10} color="#BAD2FF" />
                    Editar
                  </button>
                  <button onClick={() => handleDelete(recipient.id)}>
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
