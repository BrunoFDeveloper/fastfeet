import styled from 'styled-components';

export const InputContent = styled.input`
  background: ${({ bg }) => (bg ? bg : 'transparent')};
  border: 1px solid #ccc;
  border-radius: 4px;
  height: ${({ height }) => (height ? `${height}px` : '44px')};
  padding: 0 15px;
  color: #323232;
  margin: 0 0 10px;
  &::placeholder {
    color: #ccc;
  }
`;
