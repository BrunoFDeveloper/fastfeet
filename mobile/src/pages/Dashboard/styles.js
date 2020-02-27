import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Profile = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border: 1px solid #ccc;
`;

export const Info = styled.View`
  width: 60%;
`;

export const SmallTitle = styled.Text`
  color: #999;
  font-size: 12px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #323232;
`;

export const TitleContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const Segment = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SegmentButton = styled(TouchableOpacity)`
  background: transparent;
  margin: 0 10px;
`;

export const TextButton = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${({ active }) => (active ? '#7D41E7' : '#999')};
`;

export const ScheduleList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
