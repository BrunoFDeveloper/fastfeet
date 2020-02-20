import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FaCheck, FaChevronLeft } from 'react-icons/fa';
import api from '~/services/api';

import { Container, TopContent, FormContent } from './styles';

import Button from '~/components/Button/Button';
import Input from '~/components/Input/Input';
import AvatarPreview from '~/components/AvatarPreview/AvatarPreview';

const validationSchema = Yup.object().shape({
  avatar_id: Yup.string().required('A foto é obrigatória!'),
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido!')
    .required('O e-mail é obrigatório'),
});

export default function NewEditDeliveryman({ match, history }) {
  const { register, handleSubmit, errors } = useForm({
    validationSchema,
  });

  const [form, setForm] = useState({ name: '', email: '', avatar_id: '' });
  const [uiState, setUiState] = useState({ isEditMode: false });

  useEffect(() => {
    const { deliverymanId } = match.params;

    async function getDeliveryman() {
      try {
        const response = await api.get('/couriers', {
          params: { id: deliverymanId },
        });

        setForm(response.data[0]);
        setUiState(current => ({ ...current, isEditMode: true }));
      } catch (error) {
        toast.error('Error ao carregar entregador!');
      }
    }

    if (deliverymanId) getDeliveryman();
  }, [match.params]);

  async function onSubmit(data) {
    const { isEditMode } = uiState;
    const apiUrl = isEditMode
      ? `/couriers/${match.params.deliverymanId}`
      : '/couriers';
    const apiType = isEditMode ? 'put' : 'post';

    try {
      await api[apiType](apiUrl, { ...data });
      toast.success('Entregador salvo com sucesso!');
    } catch (error) {
      toast.error('Error ao salvar entregador!');
    }
  }

  return (
    <Container>
      <TopContent>
        <h2>Cadastro de entregadores</h2>
        <div>
          <Button bg="#CCC" onClick={() => history.push('/deliveryman')}>
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
        <AvatarPreview
          register={register}
          imageUrl={form?.avatar?.url}
          id={form?.avatar?.id}
        />
        {errors.avatar_id && <span>{errors.avatar_id.message}</span>}
        <form>
          <label htmlFor="email">Nome</label>
          <Input
            defaultValue={form.name}
            name="name"
            id="name"
            type="text"
            placeholder="Seu nome"
            ref={register}
          />
          {errors.name && <span>{errors.name.message}</span>}
          <label htmlFor="email">E-mail</label>
          <Input
            defaultValue={form.email}
            name="email"
            id="email"
            type="email"
            placeholder="exemplo@gmail.com"
            ref={register}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </form>
      </FormContent>
    </Container>
  );
}

NewEditDeliveryman.defaultProps = {
  match: {},
};

NewEditDeliveryman.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      deliverymanId: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
