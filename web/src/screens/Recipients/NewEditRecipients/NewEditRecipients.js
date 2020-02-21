import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import api from '~/services/api';

import { Container, TopContent, FormContent, Grid } from './styles';

import Button from '~/components/Button/Button';
import Input from '~/components/Input/Input';
import GridContent from '~/components/GridContent/GridContent';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatório'),
  number: Yup.string().required('Digite o número'),
  complement: Yup.string(),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
  cep: Yup.number().required('O cep é obrigatório'),
});

export default function NewEditRecipients({ match, history }) {
  const { register, handleSubmit, errors } = useForm({
    validationSchema,
  });

  const [form, setForm] = useState({ name: '', email: '', avatar_id: '' });
  const [uiState, setUiState] = useState({ isEditMode: false });

  useEffect(() => {
    const { recipientId } = match.params;

    async function getDeliveryman() {
      try {
        const response = await api.get('/recipients', {
          params: { id: recipientId },
        });

        setForm(response.data[0]);
        setUiState(current => ({ ...current, isEditMode: true }));
      } catch (error) {
        toast.error('Error ao carregar destinatário!');
      }
    }

    if (recipientId) getDeliveryman();
  }, [match.params]);

  async function onSubmit(data) {
    const { isEditMode } = uiState;
    const apiUrl = isEditMode
      ? `/recipient/${match.params.recipientId}`
      : '/recipient';
    const apiType = isEditMode ? 'put' : 'post';

    try {
      await api[apiType](apiUrl, { ...data });
      toast.success('Destinatário salvo com sucesso!');
    } catch (error) {
      toast.error('Error ao salvar destinatário!');
    }
  }

  return (
    <Container>
      <TopContent>
        <h2>
          {uiState.isEditMode
            ? 'Edição de destinatário'
            : 'Cadastro de destinatário'}
        </h2>
        <div>
          <Button bg="#CCC" onClick={() => history.push('/recipients')}>
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
          <label htmlFor="email">Nome</label>
          <Input
            defaultValue={form?.name}
            name="name"
            id="name"
            type="text"
            placeholder="Seu nome"
            ref={register}
          />
          {errors.name && <span>{errors.name.message}</span>}
          <GridContent type="column" template="3fr 1fr 1fr" gap="10px">
            <Grid>
              <label htmlFor="street">Rua</label>
              <Input
                defaultValue={form?.street}
                name="street"
                id="street"
                type="text"
                placeholder="Rua jorge alberto"
                ref={register}
              />
              {errors.street && <span>{errors.street.message}</span>}
            </Grid>
            <Grid>
              <label htmlFor="number">Número</label>
              <Input
                defaultValue={form?.number}
                name="number"
                id="number"
                type="number"
                placeholder="120"
                ref={register}
              />
              {errors.number && <span>{errors.number.message}</span>}
            </Grid>
            <Grid>
              <label htmlFor="complement">Complemento</label>
              <Input
                defaultValue={form?.complement}
                name="complement"
                id="complement"
                type="text"
                placeholder="Ap 30"
                ref={register}
              />
              {errors.complement && <span>{errors.complement.message}</span>}
            </Grid>
          </GridContent>
          <GridContent type="column" template="1fr 1fr 1fr" gap="10px">
            <Grid>
              <label htmlFor="city">Cidade</label>
              <Input
                defaultValue={form?.city}
                name="city"
                id="city"
                type="text"
                placeholder="Itu"
                ref={register}
              />
              {errors.city && <span>{errors.city.message}</span>}
            </Grid>
            <Grid>
              <label htmlFor="state">Estado</label>
              <Input
                defaultValue={form?.state}
                name="state"
                id="state"
                type="text"
                placeholder="São Paulo"
                ref={register}
              />
              {errors.state && <span>{errors.state.message}</span>}
            </Grid>
            <Grid>
              <label htmlFor="cep">CEP</label>
              <Input
                defaultValue={form?.cep}
                name="cep"
                id="cep"
                type="tel"
                placeholder="09960-580"
                ref={register}
              />
              {errors.cep && <span>{errors.cep.message}</span>}
            </Grid>
          </GridContent>
        </form>
      </FormContent>
    </Container>
  );
}

NewEditRecipients.defaultProps = {
  match: {},
};

NewEditRecipients.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipientId: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
