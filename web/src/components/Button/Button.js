import React from 'react';

import { Container } from './styles';

export default function Button({ children, bg, ...props }) {
  return (
    <Container bg={bg} {...props}>
      {children}
    </Container>
  );
}
