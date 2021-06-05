import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  /* max-width: 294px; */
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  background: #f9f9f9;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030 !important;
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
    /* background: transparent; */
    background: #f9f9f9;
    border: 0;
    border-radius: 0.8rem;
    color: #000000;
    font-size: ${({ theme }) => theme.font.sizes.small};
    padding: 5px 20px;

    ::placeholder {
      color: ${({ theme }) => theme.colors.primary};
      /* font-weight: 500; */
      font-size: ${({ theme }) => theme.font.sizes.small};
    }

    /* &::placeholder {
      color: $props => props.placeholderColor;
    } */
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-right: 0.5rem;

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

export const Label = styled.label`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 0 0.6rem 1.2rem;
  user-select: none;
`;
