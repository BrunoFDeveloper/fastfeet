import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Content,
  Title,
  TrackerContent,
  Line,
  Ball,
  SubContent,
  SmallTitle,
  MoreButton,
  Text,
} from './styles';

export default function Schedule({ data, onMoreDetails }) {
  const formattedDate = useMemo(
    () =>
      data.created_at && format(parseISO(data.created_at), "dd'/'MM'/'yyyy"),
    [data.created_at]
  );
  return (
    <Container>
      <Content>
        <Icon name="local-shipping" color="#7D41E7" size={28} />
        <Title>Encomenda 01</Title>
      </Content>

      <TrackerContent>
        <Line />
        <Content space>
          <SubContent>
            <Ball align="flex-start" active />
            <SmallTitle ball>Aguardando{'\n'}Retirada</SmallTitle>
          </SubContent>
          <SubContent>
            <Ball align="center" active={data.start_date} />
            <SmallTitle ball>Retirada</SmallTitle>
          </SubContent>
          <SubContent>
            <Ball align="flex-end" active={data.end_date} />
            <SmallTitle ball>Entregue</SmallTitle>
          </SubContent>
        </Content>
      </TrackerContent>

      <Content space>
        <SubContent>
          <SmallTitle>Data</SmallTitle>
          <SmallTitle color="#323232" size={14} bold>
            {formattedDate}
          </SmallTitle>
        </SubContent>
        <SubContent>
          <SmallTitle>Cidade</SmallTitle>
          <SmallTitle color="#323232" size={14} bold>
            {data.recipient.city}
          </SmallTitle>
        </SubContent>
        <MoreButton onPress={onMoreDetails}>
          <Text>Ver detalhes</Text>
        </MoreButton>
      </Content>
    </Container>
  );
}

Schedule.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
  onMoreDetails: PropTypes.func.isRequired,
};
