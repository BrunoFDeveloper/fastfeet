import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './styles';

export default function Modal({ children, closeModal }) {
  return (
    <Container>
      <Content>
        <button type="button" className="close" onClick={closeModal}>
          &times;
        </button>
        {children}
      </Content>
    </Container>
  );
}

Modal.defaultProps = {
  closeModal: () => {},
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  closeModal: PropTypes.func,
};
