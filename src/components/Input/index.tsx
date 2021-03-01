import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  FC,
  CSSProperties,
} from 'react';

import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  containerStyle?: CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
  showIconPassword?: boolean;
}

const Input: FC<InputProps> = ({
  name,
  containerStyle,
  icon: Icon,
  showIconPassword = false,
  ...rest
}) => {
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
    setPasswordIsVisible((prevState) => !prevState);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
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
        type={showIconPassword && !passwordIsVisible ? 'password' : ''}
        ref={inputRef}
        {...rest}
      />

      {showIconPassword && (
        // <UseAnimations
        //   reverse={passwordIsVisible}
        //   animation={visibility}
        //   size={40}
        //   speed={5}
        //   wrapperStyle={{
        //     border: 1,
        //   }}
        //   onClick={togglePasswordIsVisible}
        // />
        // Fazer alguma coisa
        <></>
      )}

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
