import React, { memo } from 'react';

import logo from '~/assets/img/logo.png';
import { Container, Content, Menu, MenuItem } from './styles';

function Header() {
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
          <strong>Admin FastFeet</strong>
          <span>sair do sistema</span>
        </div>
      </Content>
    </Container>
  );
}

export default memo(Header);
