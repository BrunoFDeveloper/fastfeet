import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ children, bg, ...props }) {
  return (
    <Container bg={bg} {...props}>
      {children}
    </Container>
  );
}

Button.defaultProps = {
  children: '',
  bg: '',
};

Button.propTypes = {
  children: PropTypes.any,
  bg: PropTypes.string,
};
