import styled from 'styled-components/native';

export const Container = styled.View`
  height: 180px;
  background: #7d41e7;
  flex-direction: row;
  padding: 40px 10px;
  justify-content: center;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 10px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
