import styled from 'styled-components';

export const Container = styled.button`
  background: ${({ bg }) => (bg ? bg : '#7159c1')};
  border: none;
  color: white;
  border-radius: 4px;
  text-transform: uppercase;
  padding: 10px 12px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    margin-right: 10px;
    height: 15px;
  }
`;
