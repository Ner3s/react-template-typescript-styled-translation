import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactElement,
} from 'react';

import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  iconPassword?: boolean;
}

function Input({
  name,
  containerStyle = {},
  icon: Icon,
  iconPassword = false,
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
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        {Icon && <Icon size={20} />}

        <input
          onFocus={handleInputFocus} // Receber o foco
          onBlur={handleInputBlur} // Perder o foco
          defaultValue={defaultValue}
          type={iconPassword && !passwordIsVisible ? 'password' : ''}
          ref={inputRef}
          {...rest}
        />

        {iconPassword &&
          (passwordIsVisible ? (
            <FiEyeOff
              size={20}
              onClick={togglePasswordIsVisible}
              color="#e4007d"
            />
          ) : (
            <FiEye
              size={20}
              onClick={togglePasswordIsVisible}
              color="#e4007d"
            />
          ))}
      </Container>
    </>
  );
};

export default Input;
