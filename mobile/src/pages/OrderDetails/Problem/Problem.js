import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import api from '~/services/api';

import StackTitle from '~/components/StackTitle/StackTitle';
import { Container, UpperContent, TextInput, SubmitButton } from './styles';

export default function Problem({ navigation, route }) {
  const { order } = route.params;
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
      await api.post('/delivery/problems', {
        delivery_id: order.id,
        description,
      });
      Alert.alert('Problema adicionado com sucesso!');
      setDescription('');
    } catch (error) {
      Alert.alert('Problema ao tentar adicionar');
    }
  }

  return (
    <Container>
      <StackTitle
        title="Informar problema"
        goBack={() => navigation.goBack()}
      />

      <UpperContent />

      <TextInput
        multiline
        placeholder="Inclua aqui o problema que ocorreu na entrega."
        inputHeight={200}
        autoCorrect={false}
        autoCapitalize="none"
        autoCompleteType="off"
        value={description}
        onChangeText={setDescription}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />

      <SubmitButton bgColor="#7d41e7" onPress={handleSubmit}>
        Enviar
      </SubmitButton>
    </Container>
  );
}

Problem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      order: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
};
