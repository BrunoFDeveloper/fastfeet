import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Badge({ text, width, ...rest }) {
  return (
    <Container width={width} {...rest}>
      <span />
      {text && text}
    </Container>
  );
}

Badge.defaultProps = {
  width: 100,
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number,
};
