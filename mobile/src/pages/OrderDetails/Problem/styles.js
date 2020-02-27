import styled from 'styled-components/native';
import Input from '~/components/Input/Input';
import Button from '~/components/Button/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;
export const UpperContent = styled.View`
  margin-top: -85px;
`;

export const TextInput = styled(Input)`
  width: 90%;
  margin: 0 auto;
`;

export const SubmitButton = styled(Button)`
  width: 90%;
  margin: 0 auto;
`;
