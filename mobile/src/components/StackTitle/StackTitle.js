import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, BackButton, Title } from './styles';

export default function StackTitle({ title, goBack }) {
  return (
    <Container>
      <BackButton onPress={goBack}>
        <Icon name="keyboard-arrow-left" size={24} color="#FFF" />
      </BackButton>
      <Title>{title}</Title>
    </Container>
  );
}

StackTitle.propTypes = {
  title: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};
