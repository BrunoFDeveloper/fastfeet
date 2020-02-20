import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/action';
import { Container, Content } from './styles';
import Input from '~/components/Input/Input';
import logo from '~/assets/img/logo.png';
import Loading from '~/components/Loading/Loading';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório!'),
  password: Yup.string().required('A senha é obrigatória!'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: signInSchema,
  });

  function onSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo FastFeet" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Seu e-mail</label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="exemplo@gmail.com"
            ref={register}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <label htmlFor="password">Sua senha</label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="sua senha"
            ref={register}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <button type="submit" disabled={loading}>
            {loading ? <Loading size={22} /> : 'Entrar no sistema'}
          </button>
        </form>
      </Content>
    </Container>
  );
}
