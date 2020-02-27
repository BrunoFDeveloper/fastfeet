import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0,0,0,0.3)',
})`
  flex: 1;
  font-size: 15px;
  padding: 10px;
  color: #323232;
  background: #fff;
  border-radius: 4px;
  height: ${({ inputHeight }) => (inputHeight ? `${inputHeight}px` : '45px')};
  margin-bottom: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
