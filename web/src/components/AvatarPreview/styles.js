import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;

  label {
    background: transparent;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px dashed #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    input {
      display: none;
    }
  }
`;
