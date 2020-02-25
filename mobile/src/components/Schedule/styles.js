import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px 20px;
  padding: 15px 10px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ space }) =>
    space &&
    css`
      justify-content: space-between;
    `}
`;

export const Title = styled.Text`
  color: #7d41e7;
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
`;

export const TrackerContent = styled.View`
  margin: 30px 20px;
  position: relative;
`;

export const Line = styled.View`
  background: #7d41e7;
  width: 100%;
  height: 1px;
  position: absolute;
  top: 5px;
`;

export const Ball = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: ${({ active }) => (active ? '#7d41e7' : '#FFF')};
  border: 1px solid #7d41e7;
  align-self: ${({ align }) => align};
  margin-bottom: 5px;
`;

export const SubContent = styled.View``;

export const SmallTitle = styled.Text`
  font-size: ${({ size }) => (size ? `${size}px` : '11px')};
  color: ${({ color }) => color || '#999'};
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
  ${({ ball }) =>
    ball &&
    css`
      height: 30px;
    `}
`;

export const MoreButton = styled(TouchableOpacity)`
  background: #fff;
`;

export const Text = styled.Text`
  color: #7d41e7;
  font-size: 14px;
  font-weight: bold;
  margin-top: 11px;
`;
