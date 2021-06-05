/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons/lib';

import { Container } from './styles';

interface InputProps {
  name: string;
  options: OptionsProps[];
  containerStyle?: CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

interface OptionsProps {
  id: any;
  value: any;
  label: string;
  checked?: boolean;
}

function InputCheckbox({
  name,
  containerStyle = {},
  options,
  ...rest
}: InputProps): ReactElement {
  const inputRefs = useRef<HTMLInputElement[]>([]); // HTMLInputElement - vai dar ao inputRef as propriedades de um input
  const { fieldName, defaultValue = [], registerField } = useField(name);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);

  const handleCheck = useCallback(() => {
    const newArray: boolean[] = [];

    inputRefs.current.forEach(item => {
      newArray.push(item.checked);
    });

    // console.log(newArray);
    setIsChecked(newArray);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue(refs: HTMLInputElement[]) {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          // eslint-disable-next-line no-param-reassign
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            // eslint-disable-next-line no-param-reassign
            ref.checked = true;
          }
        });
      },
    });

    handleCheck();
    // handleCheck();
  }, [fieldName, options, registerField, handleCheck]);

  return (
    <>
      {options.map((option, index) => (
        <Container
          key={option.id}
          style={containerStyle}
          isChecked={isChecked[index]}
        >
          <input
            defaultChecked={
              defaultValue.find((dv: string) => dv === option.id) ||
              option.checked
            }
            ref={elRef => {
              inputRefs.current[index] = elRef as HTMLInputElement;
            }}
            onChange={handleCheck}
            type="checkbox"
            name={fieldName}
            value={option.value}
            id={option.id}
            {...rest}
          />
          {option.label}
          <span />
        </Container>
      ))}
    </>
  );
}

export default InputCheckbox;
