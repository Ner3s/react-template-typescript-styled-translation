import styled from 'styled-components';

interface ContainerProps {
  isChecked?: boolean;
}

export const Container = styled.label<ContainerProps>`
  font-size: 16px;
  font-weight: 400;
  display: inline-block;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.black};
  position: relative;
  padding-left: 30px;
  padding-top: 1px;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  input[type='checkbox'] {
    display: none;
  }

  span {
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 5px;
    background: #fff;
    border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
    display: block;
    position: absolute;
    left: 0;
    top: 2px;
  }

  span:after {
    content: '';
    height: 2rem;
    width: 2rem;
    background: ${({ theme }) => theme.colors.secondary};
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 5px;
    transition: 300ms ease-in-out 0s;
  }

  input[type='checkbox']:checked ~ span:after {
    transform: translate(-50%, -50%) scale(1);
  }

  svg {
    cursor: pointer;
    position: absolute;
    right: 3.2rem;
  }
`;
