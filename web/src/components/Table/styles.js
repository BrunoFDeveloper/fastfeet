import styled from 'styled-components';

export const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    th {
      padding: 20px 10px;
    }
  }

  tbody {
    tr {
      background: #fff;
      border-radius: 4px;
      height: 45px;
      td {
        text-align: center;
        color: #9e9e9e;
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: contain;
        }
      }
      &:nth-child(even) {
        background-color: #ccc;
        height: 15px;
      }
    }
  }
`;
