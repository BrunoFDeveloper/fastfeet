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
  height: 45px;
  margin-bottom: 15px;
`;
