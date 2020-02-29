import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Badge({ width, ...rest }) {
  return (
    <Container width={width} {...rest} data-testid="badge">
      <span />
    </Container>
  );
}

Badge.defaultProps = {
  width: 100,
};

Badge.propTypes = {
  width: PropTypes.number,
};
