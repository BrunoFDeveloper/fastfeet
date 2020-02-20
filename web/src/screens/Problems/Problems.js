import React, { useState, useEffect, Fragment } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

import Table from '~/components/Table/Table';
import PopUp from '~/components/PopUp/PopUp';

export default function Problems() {
  const [problems, setProblems] = useState([]);

  function handleDelete(id) {}

  useEffect(() => {
    async function getProblems() {
      try {
        const response = await api.get('delivery/problems');
        setProblems(response.data);
      } catch (error) {
        toast.error('Erro ao listar os problemas!');
      }
    }

    getProblems();
  }, []);

  return (
    <Container>
      <h2>Problemas na entrega</h2>

      <Table titles={['Encomenda', 'Problema', 'Ações']}>
        {problems.map(problem => (
          <Fragment key={problem.id}>
            <tr>
              <td>#{problem.order.id}</td>
              <td>{problem.description}</td>
              <td>
                <PopUp>
                  <button>
                    <FaPen size={10} color="#BAD2FF" />
                    Editar
                  </button>
                  <button onClick={() => handleDelete(problem.id)}>
                    <FaTrash size={10} color="red" />
                    Cancelar encomenda
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
