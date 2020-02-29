import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/action';
import api from '~/services/api';

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
  ScheduleList,
} from './styles';
import Schedule from '~/components/Schedule/Schedule';

export default function Dashboard({ navigation }) {
  const [activeSegment, setActivedSegment] = useState('pedding');
  const [orders, setOrders] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    async function getOrders() {
      const response = await api.get(`/deliveryman/${profile.id}`);
      setOrders(response.data);
    }
    async function getDelivered() {
      const response = await api.get(`/deliveryman/${profile.id}/deliveries`);
      setDelivered(response.data);
    }
    getOrders();
    getDelivered();
  }, [profile.id, activeSegment, profile, dispatch]);

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

      {activeSegment === 'pedding' ? (
        <ScheduleList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Schedule
              data={item}
              onMoreDetails={() =>
                navigation.navigate('Details', { order: item })
              }
            />
          )}
        />
      ) : (
        <ScheduleList
          data={delivered}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Schedule
              data={item}
              onMoreDetails={() =>
                navigation.navigate('Details', { order: item })
              }
            />
          )}
        />
      )}
    </Container>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
