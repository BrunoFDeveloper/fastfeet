import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: true,
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 80px;
  margin-bottom: 20px;
`;
