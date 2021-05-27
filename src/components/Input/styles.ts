import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  background: #ffffff;
  color: #1e1e1e;
  width: 100%;
  height: 45px;
  padding: 16px;
  border: 1px solid #222;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  margin-bottom: 8px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /* Se o input estiver focado, mude a cor do icone e da borda. A cor do icone esta conectado com color */
  ${props =>
    props.isFocused &&
    css`
      border-color:   border: 1px solid #222;
    `}

  /* Se o input estiver preenchido, mude a cor do icone. A cor do icone esta conectado com color */
  ${props =>
    props.isFilled &&
    css`
      color:   border: 1px solid #222;
    `}

  svg {
    cursor: pointer;
    position: absolute;
    right: 3.2rem;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    font-size: 1.8rem;
    color: #1e1e1e;

    &::placeholder {
      color: #1e1e1e;
    }
  }
`;
