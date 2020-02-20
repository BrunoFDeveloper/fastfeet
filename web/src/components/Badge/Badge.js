import React from 'react';

import { Container } from './styles';

export default function Badge({ text, width, ...rest }) {
  return (
    <Container width={width} {...rest}>
      <span />
      {text && text}
    </Container>
  );
}
