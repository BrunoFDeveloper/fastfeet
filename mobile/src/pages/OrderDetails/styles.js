import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;
export const UpperContent = styled.View`
  margin-top: -85px;
`;
export const BoxContent = styled.View`
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  width: 90%;
  margin: 5px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ space }) =>
    space &&
    css`
      justify-content: space-between;
    `}
  ${({ around }) =>
    around &&
    css`
      justify-content: space-around;
    `}
`;

export const BoxTitle = styled.Text`
  color: #7d41e7;
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
  text-transform: uppercase;
  color: #999;
  margin-top: 10px;
`;

export const Text = styled.Text`
  text-align: ${({ align }) => align || 'left'};
  color: #999;
`;

export const ButtonIcon = styled(RectButton)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
`;
