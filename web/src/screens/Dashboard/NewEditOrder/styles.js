import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  margin: 30px auto;
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 10px;
  > div {
    display: flex;
    justify-content: space-around;
    width: 25%;
  }
  input {
    margin-bottom: 0;
  }
`;

export const FormContent = styled.div`
  background: #fff;
  padding: 30px;

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
      font-weight: bold;
    }
    span {
      color: red;
      font-size: 10px;
      margin-bottom: 10px;
    }
  }
  > span {
    color: red;
    font-size: 10px;
    margin-bottom: 10px;
    display: block;
    text-align: center;
  }
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;
