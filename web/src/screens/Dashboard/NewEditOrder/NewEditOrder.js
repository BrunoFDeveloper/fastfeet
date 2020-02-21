import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import Select from 'react-select';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { FaCheck, FaChevronLeft } from 'react-icons/fa';

import api from '~/services/api';

import { Container, TopContent, FormContent, Grid } from './styles';

import Button from '~/components/Button/Button';
import Input from '~/components/Input/Input';
import GridContent from '~/components/GridContent/GridContent';

const validationSchema = Yup.object().shape({
  // name: Yup.string().required('O nome é obrigatório'),
  // email: Yup.string()
  //   .email('E-mail inválido!')
  //   .required('O e-mail é obrigatório'),
});

export default function NewEditOrder({ match, history }) {
  const { register, handleSubmit, errors, setValue } = useForm({
    validationSchema,
  });

  const [form, setForm] = useState({});
  const [recipients, setRecipients] = useState([]);
  const [deliveryman, setDeliveryman] = useState([]);
  const [uiState, setUiState] = useState({ isEditMode: false });

  useEffect(() => {
    async function getReci() {
      const response = await api.get('/recipients');
      const data = response.data.map(item => ({
        ...item,
        value: item.id,
        label: item.name,
        field: 'recipient_id',
      }));
      setRecipients(data);
    }

    async function getDeliv() {
      const response = await api.get('/couriers');
      const data = response.data.map(item => ({
        ...item,
        value: item.id,
        label: item.name,
        field: 'deliveryman_id',
      }));
      setDeliveryman(data);
    }

    getReci();
    getDeliv();
  }, []);

  function handleChange(data) {
    setValue(data.field, data.id);
  }

  useEffect(() => {
    const { orderId } = match.params;

    async function getDeliveryman() {
      try {
        const response = await api.get('/orders', {
          params: { id: orderId },
        });

        setForm(response.data[0]);
        setUiState(current => ({ ...current, isEditMode: true }));
      } catch (error) {
        toast.error('Error ao carregar entregador!');
      }
    }

    if (orderId) getDeliveryman();
  }, [match.params]);

  async function onSubmit({ product, recipient_id, deliveryman_id }) {
    const { isEditMode } = uiState;
    const apiUrl = isEditMode ? `/orders/${match.params.orderId}` : '/orders';
    const apiType = isEditMode ? 'put' : 'post';

    try {
      await api[apiType](apiUrl, {
        product,
        recipient_id: Number(recipient_id),
        deliveryman_id: Number(deliveryman_id),
      });
      toast.success('Encomenda salva com sucesso!');
      history.push('/dashboard');
    } catch (error) {
      toast.error('Error ao salvar a encomenda!');
    }
  }
  return (
    <Container>
      <TopContent>
        <h2>
          {uiState.isEditMode
            ? 'Edição de encomenda'
            : 'Cadastro de encomendas'}
        </h2>
        <div>
          <Button bg="#CCC" onClick={() => history.push('/dashboard')}>
            <FaChevronLeft color="#FFF" />
            Voltar
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            <FaCheck color="#FFF" />
            Salvar
          </Button>
        </div>
      </TopContent>
      <FormContent>
        <form>
          <GridContent type="column" template="1fr 1fr" gap="10px">
            <Grid>
              <label htmlFor="email">Destinatário</label>
              <Select
                name="recipient"
                ref={register}
                options={recipients}
                onChange={handleChange}
                placeholder="Busque o destinatário"
                value={form?.recipient_id}
              />
              <input name="recipient_id" ref={register} hidden />
              {errors.recipient && <span>{errors.recipient.message}</span>}
            </Grid>
            <Grid>
              <label htmlFor="email">Entregador</label>
              <Select
                name="deliveryman"
                ref={register}
                options={deliveryman}
                placeholder="Busque o entregador"
                onChange={handleChange}
                value={form?.deliveryman_id}
              />
              <input name="deliveryman_id" ref={register} hidden />
              {errors.deliveryman && <span>{errors.deliveryman.message}</span>}
            </Grid>
          </GridContent>
          <br />
          <label htmlFor="product">Nome do produto</label>
          <Input
            defaultValue={form?.product}
            name="product"
            id="product"
            type="text"
            placeholder="Digite o nome do produto"
            ref={register}
          />
          {errors.product && <span>{errors.product.message}</span>}
        </form>
      </FormContent>
    </Container>
  );
}

NewEditOrder.defaultProps = {
  match: {},
};

NewEditOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
