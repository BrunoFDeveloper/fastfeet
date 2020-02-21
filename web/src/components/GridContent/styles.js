import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  ${({ type, template }) =>
    type === 'row' &&
    css`
      grid-template-rows: ${template};
    `}
  ${({ type, template }) =>
    type === 'column' &&
    css`
      grid-template-columns: ${template};
    `}
  gap: ${({ gap }) => gap && gap};
  margin: ${({ margin }) => margin && margin};
`;
