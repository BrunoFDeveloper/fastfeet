import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';
import { signInRequest } from '~/store/modules/auth/action';

import { Container, Logo } from './styles';
import logo from '~/assets/img/logo-white.png';
import BgGradient from '~/components/BackgroundGradient/BackgroundGradient';
import Input from '~/components/Input/Input';
import Button from '~/components/Button/Button';

export default function SignIn() {
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  return (
    <BgGradient colors={['#7D41E7', '#7D41E7']}>
      <StatusBar barStyle="light-content" />
      <Container>
        <Logo source={logo} />
        <Input
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          keyboardType="numeric"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
        />
        <Button onPress={() => dispatch(signInRequest(userId))}>
          Entrar no sistema
        </Button>
      </Container>
    </BgGradient>
  );
}
