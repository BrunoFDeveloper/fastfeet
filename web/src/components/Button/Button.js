import React from 'react';

import { Container } from './styles';

export default function Button({ children, bg }) {
  return <Container bg={bg}>{children}</Container>;
}
