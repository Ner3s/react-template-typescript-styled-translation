/* eslint-disable react/require-default-props */
import {
  SelectHTMLAttributes,
  forwardRef,
  useRef,
  useEffect,
  useState,
  useCallback,
  ForwardedRef,
  useImperativeHandle,
  Dispatch,
  SetStateAction,
  CSSProperties,
} from 'react';

import { useField } from '@unform/core';
import { IoIosArrowDown } from 'react-icons/io';

import { SelectBlock, SelectField } from './styles';

export interface SelectOptionProps {
  label?: string;
  value?: string | number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options?: SelectOptionProps[];
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  containerStyle?: CSSProperties;
  initialValue?: SelectOptionProps;
  isDisabled?: boolean;
  setParentFocus?: () => void;
}

const Select = forwardRef(
  (
    {
      name,
      options,
      setValue,
      setParentFocus,
      containerStyle = {},
      initialValue,
      isDisabled = false,
      ...props
    }: SelectProps,
    innerRef?: ForwardedRef<HTMLSelectElement>,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const { fieldName, defaultValue, registerField, error } = useField(name);
    const inputRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      innerRef,
      () => inputRef.current,
      [],
    );

    const handleInputFocus = useCallback((): void => {
      setIsFocused(true);
      if (setParentFocus) {
        setParentFocus();
      }
    }, [setParentFocus]);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const handleChange = useCallback(
      (e) => {
        setValue && setValue(e.target.value);
      },
      [setValue],
    );

    useEffect(() => {
      registerField<string>({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);

    return (
      <SelectBlock
        isErrored={!!error}
        isFocused={isFocused}
        isDisabled={isDisabled}
        style={containerStyle}
      >
        <SelectField
          defaultValue={defaultValue}
          name={name}
          ref={inputRef}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          isFocused={isFocused}
          {...props}
        >
          <option disabled hidden value={initialValue?.value || ''}>
            {initialValue?.label || 'Selecione uma opção'}
          </option>
          {options
            ?.filter((option) => option.value !== initialValue?.value)
            .map((option) => (
              <option key={option.value || ''} value={option.value || ''}>
                {option.label}
              </option>
            ))}
        </SelectField>
        <IoIosArrowDown
          size={20}
          style={{ position: 'absolute', right: 20, zIndex: -1 }}
        />
      </SelectBlock>
    );
  },
);

export default Select;
