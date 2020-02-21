import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function GridContent({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}

GridContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};
