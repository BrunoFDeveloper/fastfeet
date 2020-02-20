import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
export const Content = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  position: relative;

  button.close {
    position: absolute;
    right: 15px;
    top: 5px;
    border: 0;
    font-size: 24px;
  }
`;
