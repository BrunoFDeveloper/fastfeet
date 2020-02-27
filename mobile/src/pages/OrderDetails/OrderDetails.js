import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  UpperContent,
  BoxContent,
  Content,
  BoxTitle,
  Title,
  Text,
  ButtonIcon,
} from './styles';
import StackTitle from '~/components/StackTitle/StackTitle';

export default function OrderDetails({ navigation, route }) {
  const { order } = route.params;
  const withdrawalDate = useMemo(
    () =>
      order.start_date
        ? format(parseISO(order.start_date), "dd'/'MM'/'yyyy")
        : '--/--/--',
    [order.start_date]
  );

  const endDate = useMemo(
    () =>
      order.end_date
        ? format(parseISO(order.end_date), "dd'/'MM'/'yyyy")
        : '--/--/--',
    [order.end_date]
  );

  function navigateTo(page) {
    navigation.navigate(page, { order });
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <StackTitle
        title="Detalhes da encomenda"
        goBack={() => navigation.goBack()}
      />

      <UpperContent />

      <BoxContent>
        <Content>
          <Icon name="local-shipping" color="#7D41E7" size={22} />
          <BoxTitle>Informações da entrega</BoxTitle>
        </Content>
        <Title>Destinatário</Title>
        <Text>{order.recipient.name}</Text>
        <Title>Endereço de entrega</Title>
        <Text>
          {order.recipient.street}, {order.recipient.number},{' '}
          {order.recipient.city}, {order.recipient.state}, {order.recipient.cep}
        </Text>
        <Title>Produto</Title>
        <Text>{order.product}</Text>
      </BoxContent>

      <BoxContent>
        <Content>
          <Icon name="event" color="#7D41E7" size={22} />
          <BoxTitle>Situação da entrega</BoxTitle>
        </Content>
        <Title>Status</Title>
        <Text>Pendente</Text>
        <Content around>
          <View>
            <Title>Data de retirada</Title>
            <Text>{withdrawalDate}</Text>
          </View>
          <View>
            <Title>Data de entrega</Title>
            <Text>{endDate}</Text>
          </View>
        </Content>
      </BoxContent>

      {!order.end_date && (
        <BoxContent>
          <Content>
            <ButtonIcon onPress={() => navigateTo('Problem')}>
              <Icon name="highlight-off" color="red" size={24} />
              <Text align="center">Informar Problema</Text>
            </ButtonIcon>
            <ButtonIcon onPress={() => navigateTo('Problems')}>
              <Icon name="error-outline" color="#EBC767" size={24} />
              <Text align="center">Visualizar Problema</Text>
            </ButtonIcon>
            <ButtonIcon onPress={() => navigateTo('Confirm')}>
              <Icon name="check-circle" color="#7D41E7" size={24} />
              <Text align="center">Confirmar Entrega</Text>
            </ButtonIcon>
          </Content>
        </BoxContent>
      )}
    </Container>
  );
}

OrderDetails.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      order: PropTypes.shape({
        product: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        recipient: PropTypes.shape({
          name: PropTypes.string,
          street: PropTypes.string,
          number: PropTypes.number,
          city: PropTypes.string,
          state: PropTypes.string,
          cep: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
