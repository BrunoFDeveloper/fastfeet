import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { Container, PopContent } from './styles';

export default function PopUp({ children }) {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <button type="button" onClick={() => setShow(!show)}>
        <FaEllipsisH size={23} color="#ccc" />
      </button>
      {show && <PopContent>{children}</PopContent>}
    </Container>
  );
}
