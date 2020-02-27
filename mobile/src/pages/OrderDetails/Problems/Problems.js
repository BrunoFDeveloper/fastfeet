import React, { useState, useEffect, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import api from '~/services/api';
import StackTitle from '~/components/StackTitle/StackTitle';
import {
  Container,
  UpperContent,
  BoxContent,
  Content,
  Title,
  Text,
} from './styles';

export default function Problems({ navigation, route }) {
  const { order } = route.params;
  const [problems, setProblems] = useState('');

  const formatDate = useCallback(
    date => format(parseISO(date), "dd'/'MM'/'yyyy"),
    []
  );

  useEffect(() => {
    async function getProblems() {
      const response = await api.get('/delivery/problems', {
        params: { orderId: order.id },
      });
      setProblems(response.data);
    }
    getProblems();
  }, [order.id]);

  return (
    <Container>
      <StackTitle
        title="Visualizar problemas"
        goBack={() => navigation.navigate('Details')}
      />

      <UpperContent />
      <FlatList
        data={problems}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <BoxContent>
            <Content space>
              <Title>{item.description.substring(0, 26)}</Title>
              <Text>{formatDate(item.created_at)}</Text>
            </Content>
          </BoxContent>
        )}
      />
    </Container>
  );
}

Problems.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      order: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
};
