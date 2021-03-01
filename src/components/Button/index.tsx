import { ButtonHTMLAttributes, FC, CSSProperties } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  buttonDisable?: boolean;
  extraStyles?: CSSProperties;
  size?: 'normal' | 'small';
  variant?: 'yellow' | 'black' | 'red';
  textContent: string;
  letterSpacing?: boolean;
};

const Button: FC<ButtonProps> = ({
  loading,
  buttonDisable,
  extraStyles,
  textContent,
  ...rest
}) => (
  <Container
    type="button"
    disabled={buttonDisable}
    buttonDisable={buttonDisable}
    style={extraStyles}
    {...rest}
  >
    {loading ? (
      //fazer alguma coisa.
      <></>
    ) : (
      <p>{textContent}</p>
    )}
  </Container>
);

export default Button;
