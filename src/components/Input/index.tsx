import {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  CSSProperties,
  ReactElement,
} from 'react';

import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import UseAnimations from 'react-useanimations';
import visibility from 'react-useanimations/lib/visibility';

import { Container, Error, Label } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  containerStyle?: CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
  showIconPassword?: boolean;
}

function Input({
  name,
  containerStyle,
  label,
  icon: Icon,
  showIconPassword = false,
  ...rest
}: InputProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null); // HTMLInputElement - vai dar ao inputRef as propriedades de um input

  const [isFocused, setIsFocused] = useState(false); // Se esta com foco
  const [isFilled, setIsFilled] = useState(false); // Se esta preenchido
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // Verifica se o inputRef tem um valor/value. Se tiver preenchido = true. Se tiver vazio = false. !! Tranforma o value em booleano.
    setIsFilled(!!inputRef.current?.value); // inputRef pega o valor direto do Input. document.querySelector('input') e etc.
  }, []);

  const togglePasswordIsVisible = useCallback(() => {
    setPasswordIsVisible(prevState => !prevState);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        <input
          onFocus={handleInputFocus} // Receber o foco
          onBlur={handleInputBlur} // Perder o foco
          defaultValue={defaultValue}
          type={showIconPassword && !passwordIsVisible ? 'password' : ''}
          ref={inputRef}
          {...rest}
        />

        {Icon && <Icon size={20} />}

        {showIconPassword && (
          <UseAnimations
            reverse={passwordIsVisible}
            animation={visibility}
            size={33}
            speed={5}
            wrapperStyle={{
              border: 1,
              position: 'absolute',
              top: '0.2rem',
              right: '0.2rem',
            }}
            onClick={togglePasswordIsVisible}
          />
        )}

        {error && !showIconPassword && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
}

export default Input;
