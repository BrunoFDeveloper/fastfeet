import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  color: white;
  margin: 0 auto;
  background: #f0f0df;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${darken(0.2, '#F0F0DF')};
  }

  &::after {
    position: relative;
    display: block;
    font-size: 12px;
    font-weight: 400;
    content: 'PENDENTE';
    color: ${darken(0.2, '#F0F0DF')};
    left: -4px;
  }

  ${({ start }) =>
    start &&
    css`
      background: #bad2ff;
      &::after {
        content: 'RETIRADA';
        color: ${darken(0.2, '#BAD2FF')};
      }

      span {
        background: ${darken(0.2, '#BAD2FF')};
      }
    `}

  ${({ canceled }) =>
    canceled &&
    css`
      background: #fab0b0;
      &::after {
        content: 'RETIRADA';
        color: ${darken(0.2, '#FAB0B0')};
      }

      span {
        background: ${darken(0.2, '#FAB0B0')};
      }
    `}

  ${({ end }) =>
    end &&
    css`
      background: #dff0df;
      &::after {
        content: 'ENTREGUE';
        color: ${darken(0.2, '#DFF0DF')};
      }

      span {
        background: ${darken(0.2, '#DFF0DF')};
      }
    `}
`;
