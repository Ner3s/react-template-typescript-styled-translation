import styled from 'styled-components';

interface ContainerProps {
  isChecked?: boolean;
}

export const Container = styled.label<ContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  /* height: 100%; */
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.primary};
  padding-bottom: ${({ theme }) => theme.font.sizes.small};
  margin-bottom: ${({ theme }) => theme.font.sizes.small};
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

  p {
    margin-left: 2.8rem;
    padding-top: 2.5px;
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

  span {
    border-radius: 50%;
    height: 2.1rem;
    width: 2.1rem;
    background: #fff;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    display: block;
    position: absolute;
    left: 0;
    top: 2px;
  }

  span:after {
    content: '';
    height: 2.1rem;
    width: 2.1rem;
    background: ${({ theme }) => theme.colors.primary};
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    transition: 300ms ease-in-out 0s;
  }

  input[type='radio']:checked ~ span:after {
    transform: translate(-50%, -50%) scale(1);
  }
`;
