import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/action';

import {
  Container,
  Profile,
  Avatar,
  Info,
  SmallTitle,
  Title,
  TitleContent,
  Segment,
  SegmentButton,
  TextButton,
} from './styles';
import Schedule from '~/components/Schedule/Schedule';

export default function Dashboard() {
  const [activeSegment, setActivedSegment] = useState('pedding');
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function LogOut() {
    Alert.alert(
      'Deseja deslogar?',
      '',
      [
        {
          text: 'Não',
          onPress: () => {},
        },
        { text: 'Sim', onPress: () => dispatch(signOut()) },
      ],
      { cancelable: false }
    );
  }

  return (
    <Container>
      <Profile>
        <Avatar source={{ uri: profile.avatar.url }} />
        <Info>
          <SmallTitle>Bem vindo de volta,</SmallTitle>
          <Title>{profile.name}</Title>
        </Info>
        <TouchableOpacity onPress={LogOut}>
          <Icon name="exit-to-app" size={30} color="#E74040" />
        </TouchableOpacity>
      </Profile>

      <TitleContent>
        <Title>Entregas</Title>
        <Segment>
          <SegmentButton onPress={() => setActivedSegment('pedding')}>
            <TextButton active={activeSegment === 'pedding'}>
              Pendentes
            </TextButton>
          </SegmentButton>
          <SegmentButton onPress={() => setActivedSegment('delivered')}>
            <TextButton active={activeSegment === 'delivered'}>
              Entregues
            </TextButton>
          </SegmentButton>
        </Segment>
      </TitleContent>

      <Schedule />
      <Schedule />
      <Schedule />
    </Container>
  );
}
