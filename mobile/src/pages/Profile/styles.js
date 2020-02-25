import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background: #fff;
`;

export const Avatar = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  align-self: center;
  margin-bottom: 40px;
  border: 1px solid #ccc;
`;

export const Content = styled.View`
  flex: 1;
  padding: 30px;
  justify-content: center;
`;

export const SmallTitle = styled.Text`
  color: #323232;
  font-size: 13px;
`;

export const Field = styled.Text`
  color: #323232;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 18px;
`;
