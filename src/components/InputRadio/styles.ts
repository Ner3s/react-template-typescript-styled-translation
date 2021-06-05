import styled, { css } from 'styled-components';

interface ContainerProps {
  isChecked?: boolean;
}

export const Container = styled.label<ContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  background: transparent;
  color: ${({ theme }) => theme.colors.text_primary};
  width: 100%;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.primary};
  padding-bottom: ${({ theme }) => theme.sizes.small};
  margin-bottom: ${({ theme }) => theme.sizes.small};
  cursor: pointer;
  transition: all 200ms ease-in-out;

  .radio {
    margin-right: 7px;
    width: 21px;
    height: 21px;
    min-width: 21px;
    min-height: 21px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
  }

  ${props =>
    props.isChecked &&
    css`
      .radio {
        transition: all 200ms ease-in-out;
        background-color: ${({ theme }) => theme.colors.primary};
      }
    `};

  p {
    font-size: 14px;
    letter-spacing: 0.28px;
    font-weight: 400;
  }

  svg {
    cursor: pointer;
    position: absolute;
    right: 3.2rem;
  }

  input {
    appearance: none;
  }
`;
