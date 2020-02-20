import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;

  button {
    background: transparent;
    border: 0;
  }
`;

export const PopContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 10px;
  width: 140px;
  background: #fff;
  top: 30px;
  left: calc(50% - 70px);
  filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.2));
  border-radius: 4px;
  z-index: 99;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
  }

  button {
    color: #ccc;
    padding: 8px 0;
    text-align: left;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    svg {
      margin-right: 10px;
    }
  }
`;
