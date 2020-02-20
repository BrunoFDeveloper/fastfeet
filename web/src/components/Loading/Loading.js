import React from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const IconContent = styled(FaSpinner)`
  animation: spin 4s linear infinite;

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default function Loading({ color, size, animation }) {
  return <IconContent color={color} size={size} animation={animation} />;
}
