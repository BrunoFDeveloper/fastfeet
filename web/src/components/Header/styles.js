import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.header`
  width: 100%;
  background: #fff;
  height: 65px;
`;

export const Content = styled.div`
  width: 1000px;
  margin: 0 auto;
  height: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;

  div:first-child {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    img {
      width: 200px;
    }

    .logo {
      display: block;
      position: relative;
      margin-right: 40px;
      &::after {
        content: '';
        position: absolute;
        width: 1px;
        top: 0;
        right: -20px;
        height: 100%;
        background: #ccc;
      }
    }
  }

  div:not(:first-child) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    button {
      background: transparent;
      border: none;
      color: red;
    }
  }
`;

export const Menu = styled.nav``;

export const MenuItem = styled(NavLink)`
  margin-right: 15px;
  color: #ccc;
  text-transform: uppercase;
  font-weight: 700;
  &.active {
    color: #323232;
  }
`;
