import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/action';
import logo from '~/assets/img/logo.png';
import { Container, Content, Menu, MenuItem } from './styles';

function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <div>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Menu>
            <MenuItem to="/dashboard">Encomendas</MenuItem>
            <MenuItem to="/deliveryman">Entregadores</MenuItem>
            <MenuItem to="/recipients">Destinatários</MenuItem>
            <MenuItem to="/problems">Problemas</MenuItem>
          </Menu>
        </div>
        <div>
          <strong>{profile?.name}</strong>
          <button type="button" onClick={() => dispatch(signOut())}>
            sair do sistema
          </button>
        </div>
      </Content>
    </Container>
  );
}

export default memo(Header);
