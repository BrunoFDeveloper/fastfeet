import React from 'react';

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

export default function Schedule() {
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
            <Ball align="center" />
            <SmallTitle ball>Retirada</SmallTitle>
          </SubContent>
          <SubContent>
            <Ball align="flex-end" />
            <SmallTitle ball>Entregue</SmallTitle>
          </SubContent>
        </Content>
      </TrackerContent>

      <Content space>
        <SubContent>
          <SmallTitle>Data</SmallTitle>
          <SmallTitle color="#323232" size={14} bold>
            15/01/2020
          </SmallTitle>
        </SubContent>
        <SubContent>
          <SmallTitle>Cidade</SmallTitle>
          <SmallTitle color="#323232" size={14} bold>
            Rio do Sul
          </SmallTitle>
        </SubContent>
        <MoreButton>
          <Text>Ver detalhes</Text>
        </MoreButton>
      </Content>
    </Container>
  );
}
