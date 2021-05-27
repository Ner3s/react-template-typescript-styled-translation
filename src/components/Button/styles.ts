import { shade, lighten } from 'polished';
import styled, { css } from 'styled-components';

interface ButtonProps {
  bgColor?: string;
}

export const Container = styled.button<ButtonProps>`
  background: #222;

  border-radius: 2rem;
  padding: 0.5rem 3rem;

  height: 4rem;
  max-width: 323px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  box-shadow: 0.1rem 0.1rem 1rem #00000029;

  &:hover {
    background: ${lighten(0.1, '#222')};
  }

  &:active {
    background: ${shade(0.1, '#222')};
  }

  background: ${(props) => props.bgColor};

  &:hover {
    ${(props) =>
      props.bgColor &&
      css`
        background: ${lighten(0.1, `${props.bgColor}`)};
      `}
  }

  &:active {
    ${(props) =>
      props.bgColor &&
      css`
        background: ${shade(0.1, `${props.bgColor}`)};
      `}
  }
`;

export const ButtonText = styled.p`
  color: #fff;
  font-size: 1.6rem;
  font-family: 'Poppins';
  font-weight: 700;
  letter-spacing: 0.64px;
  align-items: center;
`;
