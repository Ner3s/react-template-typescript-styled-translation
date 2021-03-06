import { ButtonHTMLAttributes, CSSProperties, ReactElement } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container, ButtonText } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string;
  textFontSize?: number;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: CSSProperties;
  bgColor?: string;
}

function Button({
  children,
  containerStyle = {},
  textColor,
  textFontSize,
  bgColor = '',
  icon,
  ...rest
}: ButtonProps): ReactElement {
  return (
    <Container bgColor={bgColor} type="button" style={containerStyle} {...rest}>
      {icon}
      <ButtonText
        style={{
          fontSize: textFontSize || '1.5rem',
          color: textColor || '#FFF',
        }}
      >
        {children}
      </ButtonText>
    </Container>
  );
}

export default Button;
