import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import Button from '~/components/Button/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const UpperContent = styled.View`
  margin-top: -85px;
`;

export const CameraContent = styled(RNCamera)`
  height: 430px;
  width: 90%;
  margin: 0 auto;
  border-radius: 4px;
  flex-direction: column;
  justify-content: flex-end;
  background: black;
`;

export const CameraButton = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 15px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  width: 90%;
  margin: 15px auto;
`;
