'use client';

import { cn } from '@/utils/cn';
import { formatPhoneNumber } from '@/utils/format-phone-number';
import { ArrowPathIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { z } from 'zod';
import Button from '../buttons/button';

const mobile = z.string().length(15).startsWith('(9');

interface IInputNewProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  index: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  loading: boolean;
}

const Input = ({
  id,
  type,
  className,
  name,
  placeholder,
  label,
  index,
  value,
  setValue,
  loading,
}: IInputNewProps) => {
  const [error, setError] = useState<boolean | null>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleValidatePhone = () => {
    if (type !== 'tel') {
      return;
    }
    if (value.length < 1) {
      setError(null);
      return;
    }
    if (value.length > 0) {
      const result = mobile.safeParse(value);
      if (!result.success) {
        setError(true);
        return;
      }
      if (result.success) {
        setError(false);
        return;
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'tel') {
      const formattedPhoneNumber = formatPhoneNumber(event.target.value);
      setValue(formattedPhoneNumber);
      if (value.length === 15) {
        handleValidatePhone();
      }
      if (value.length < 15) {
        setError(null);
      }
    } else {
      setValue(event.target.value);
    }
    // setPhonePlaceholderText('Телефон без +7');
  };

  const handleInputFocus = useCallback(
    (e?: React.FocusEvent<HTMLInputElement>) => {
      setFocus(true);
    },
    [setFocus],
  );

  const handleInputBlur = (e?: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    if (value.length === 0) {
      setError(null);
    }
    if (e?.target.type === 'tel') {
      handleValidatePhone();
    }
  };

  useEffect(() => {
    if (value.length === 15 && ref.current?.type === 'tel') {
      handleValidatePhone();
    }
  }, [value, ref]);

  const baseStyles =
    'peer text-lg md:text-xl bg-slate-100 dark:bg-slate-900 autofill:text-slate-900 dark:autofill:text-slate-100 border-0 block w-full rounded-md py-2 pl-4 pr-10 text-gray-900 dark:text-gray-200 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-1 focus:ring-inset focus:ring-indigo-600 lg:text-2xl';

  const invalidInputStyles =
    'text-pink-600 ring-pink-500 focus:text-pink-600 focus:ring-pink-500 dark:text-pink-500 dark:ring-pink-400 dark:focus:text-pink-500 dark:focus:ring-pink-400';
  const validInputStyles =
    'text-emerald-600 ring-emerald-500 focus:text-emerald-600 focus:ring-emerald-500 dark:text-emerald-300 dark:ring-emerald-200 dark:focus:text-emerald-300 dark:focus:ring-emerald-200';
  const autofillInputStyles =
    'autofill:shadow-[inset_0_0_0px_1000px_rgb(230,230,230)] dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(200,200,200)]';
  return (
    <>
      <div className='mb-4 w-10/12'>
        <label
          htmlFor={name}
          className='mb-2 block text-xl leading-6 text-gray-900 dark:text-gray-100 md:text-2xl'
        >
          {label}
        </label>
        <div className='relative mt-2 rounded-md shadow-sm'>
          <input
            ref={ref}
            onChange={handleChange}
            type={type}
            name={name}
            id={id}
            required
            minLength={2}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={value}
            className={cn(
              baseStyles,
              autofillInputStyles,
              error === true ? invalidInputStyles : error === false ? validInputStyles : '',
            )}
            placeholder={placeholder}
          />
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            {name === 'name' ? (
              <UserIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            ) : name === 'phone' ? (
              <PhoneIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            ) : null}
          </div>
        </div>
        {error && <p className='mt-4 text-sm text-pink-500 dark:text-pink-500 lg:text-xl'>пожалуйста, введите корректный номер телефона</p>}
      </div>
      {index === 1 && (
        <Button type='submit' loading={loading} disabled={error === true || error === null}>
          {error === true || error === null ? 'заполните форму' : 'записаться'}
        </Button>
      )}
    </>
  );
};

export default Input;
