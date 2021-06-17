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
  options: IOptionsRadioProps[];
  containerStyle?: CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

export interface IOptionsRadioProps {
  id?: any;
  label?: string;
}

function InputRadio({
  name,
  containerStyle = {},
  icon: Icon,
  options,
  ...rest
}: InputProps): ReactElement {
  const inputRefs = useRef<HTMLInputElement[]>([]); // HTMLInputElement - vai dar ao inputRef as propriedades de um input
  const { fieldName, defaultValue, registerField } = useField(name);

  const [isChecked, setIsChecked] = useState<boolean[]>([]);

  const handleCheck = useCallback(
    (i?: any) => {
      const newArray: boolean[] = [];

      options.forEach((item, index) => {
        if (i === index) {
          newArray.push(true);
        } else {
          newArray.push(false);
        }
      });

      setIsChecked(newArray);
    },
    [options],
  );

  useEffect(() => {
    // setIsChecked(null);
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue(refs) {
        const checked = refs.find((ref: { checked: any }) => ref.checked);

        return checked ? checked.value : null;
      },
      setValue(refs, value) {
        const item = refs.find((ref: { value: any }) => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });

    handleCheck();
  }, [fieldName, options, registerField, handleCheck]);

  return (
    <>
      {options.map((option, index) => (
        <Container
          key={option.id}
          style={containerStyle}
          isChecked={isChecked[index]}
        >
          {/* <div className="radio" /> */}
          <input
            ref={elRef => {
              inputRefs.current[index] = elRef as HTMLInputElement;
            }}
            type="radio"
            defaultValue={defaultValue}
            name={fieldName}
            onChange={() => {
              handleCheck(index);
            }}
            value={option.id}
            {...rest}
          />
          <span />
          <p>{option.label}</p>
          {Icon && <Icon size={20} />}
        </Container>
      ))}
    </>
  );
}

export default InputRadio;
