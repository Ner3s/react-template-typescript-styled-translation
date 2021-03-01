import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  background: #ffffff;
  color: #000000;

  width: 100%;
  height: 5rem;

  padding: 1.6rem 3.4rem;

  border: 0.5px solid #707070;
  border-radius: 4rem;

  transition: all 0.2s ease-in-out;

  /* & + div {
    margin-top: 2.2rem;
  } */

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /* Se o input estiver focado, mude a cor do icone e da borda. A cor do icone esta conectado com color */
  /* ${(props) =>
    props.isFocused &&
    css`
      color: green;
      border-color: #ffdf22;
    `} */

  /* Se o input estiver preenchido, mude a cor do icone. A cor do icone esta conectado com color */
  /* ${(props) =>
    props.isFilled &&
    css`
      color: green;
      border-color: #ffdf22;
    `} */


  /* Icon Eye */
  > svg {
    stroke-width: 1px;
  }

  > input {
    flex: 1;
    width: 100%;

    background: transparent;
    border: 0;
    color: #000000;

    font-size: 2.1rem;

    &::placeholder {
      color: #000000;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
