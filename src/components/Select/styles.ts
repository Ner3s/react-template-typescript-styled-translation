import styled, { css } from 'styled-components';

import Tooltip from '~/components/Tooltip';

interface SelectBlockProps {
  isFocused: boolean;
  isErrored: boolean;
  isDisabled?: boolean;
}

interface SelectLabelProps {
  isFocused: boolean;
}

export const SelectBlock = styled.div<SelectBlockProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #f9f9f9;
  width: 100%;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.8rem;
  transition: all 0.2s ease-in-out;
  margin-bottom: 8px;
  z-index: 2;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
  letter-spacing: 0.28px;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /* Se o input estiver focado, mude a cor do icone e da borda. A cor do icone esta conectado com color */
  ${(props) =>
    props.isFocused &&
    css`
      color:   border: 1px solid ${({ theme }) => theme.colors.secondary};
      border-color:   border: 1px solid ${({ theme }) =>
        theme.colors.secondary};
    `}

  ${(props) =>
    props.isDisabled &&
    css`
      border-color: #00000024 !important;
      color: #00000050 !important;
    `}
`;

export const SelectField = styled.select<SelectLabelProps>`
  appearance: none;
  all: unset;
  width: 100%;
  padding: 1rem 2.1rem;

  option {
    font-size: 1.4rem;
    font-weight: 400;
    color: #000000;
    letter-spacing: 0.28px;
  }
`;

export const SelectError = styled(Tooltip)`
  height: 20px;

  svg {
    margin-right: 0;
    margin-left: 15px;
  }
`;
