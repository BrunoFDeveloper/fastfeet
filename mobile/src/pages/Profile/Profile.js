import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { signOut } from '~/store/modules/auth/action';
import { Container, Avatar, Content, SmallTitle, Field } from './styles';
import Button from '~/components/Button/Button';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const formattedDate = useMemo(
    () => format(parseISO(profile.created_at), "dd'/'MM'/'yyyy"),
    [profile.created_at]
  );

  return (
    <Container>
      <Content>
        <Avatar source={{ uri: profile.avatar.url }} />
        <SmallTitle>Nome completo</SmallTitle>
        <Field>{profile.name}</Field>

        <SmallTitle>Email</SmallTitle>
        <Field>{profile.email}</Field>

        <SmallTitle>Data de cadastro</SmallTitle>
        <Field>{formattedDate}</Field>

        <Button
          bgColor="#E74040"
          style={{ marginTop: 20 }}
          onPress={() => dispatch(signOut())}
        >
          Logout
        </Button>
      </Content>
    </Container>
  );
}
