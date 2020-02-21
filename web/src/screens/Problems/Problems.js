import React, { useState, useEffect, Fragment } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

import Table from '~/components/Table/Table';
import PopUp from '~/components/PopUp/PopUp';
import Modal from '~/components/Modal/Modal';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [modal, setModal] = useState({ show: false, data: {} });

  function handleDelete(id) {}

  function handleModal(item) {
    setModal({ show: !modal.show, data: item });
  }

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
                  <button type="button" onClick={() => handleModal(problem)}>
                    <FaEye size={10} color="#BAD2FF" />
                    Visualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(problem.id)}
                  >
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
      {modal.show && (
        <Modal closeModal={() => handleModal(null)}>
          <h4>VISUALIZAR PROBLEMA</h4>
          <br />
          <p>{modal.data.description}</p>
        </Modal>
      )}
    </Container>
  );
}
