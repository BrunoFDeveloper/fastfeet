import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 400px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 40px 20px;

  img {
    width: 270px;
    margin: 0 auto;
    display: block;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;

    label {
      font-weight: bold;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-size: 11px;
      &:not(:first-child) {
        margin-top: 10px;
      }
    }

    span {
      color: #ff7979;
      font-size: 10px;
    }

    button {
      background: #7159c1;
      height: 40px;
      border: 0;
      color: #fff;
      font-weight: bold;
      border-radius: 4px;
      margin-top: 10px;
    }
  }
`;
