import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import { CSSProperties } from 'styled-components';
import { Container, ButtonText } from './styles';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string;
  textFontSize?: number;
  icon?: any;
  containerStyle?: CSSProperties;
  bgColor?: string;
}

function Button({
  children,
  containerStyle,
  textColor,
  textFontSize,
  bgColor,
  icon,
  ...rest
}: ButtonProps): ReactElement {
  return (
    <Container bgColor={bgColor} type="button" style={containerStyle} {...rest}>
      {icon}
      <ButtonText
        style={{ fontSize: textFontSize, color: textColor || '#FFF' }}
      >
        {children}
      </ButtonText>
    </Container>
  );
};

export default Button;
