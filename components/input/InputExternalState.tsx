'use client';

import { cn } from '@/utils/cn';
import { HtmlHTMLAttributes, InputHTMLAttributes } from 'react';

interface IInputExternalStateProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  index?: number;
  classNameDiv?: string;
}

const radioStyle = 'flex flex-row flex-wrap items-center justify-center gap-2 p-2';
const inputStyle = 'w-full rounded-md';
const radioStyleInput = 'h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600';

export const InputExternalState = ({
  label,
  id,
  name,
  value,
  type,
  placeholder,
  onChange,
  className,
  required,
  classNameDiv,
  ...props
}: IInputExternalStateProps) => {
  return (
    <div className={cn(type === 'radio' ? radioStyle : 'flex flex-col items-start justify-center gap-2 p-2', classNameDiv)}>
      <label
        htmlFor={name}
        className='block text-base font-medium leading-6 text-gray-900 sm:text-lg md:text-xl lg:text-2xl'
      >
        {label}
      </label>
      <input
        {...props}
        className={cn(type === 'radio' ? radioStyleInput : inputStyle, className)}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

interface ITextAreaExternalStateProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  index?: number;
}

export const TextAreaExternalState = ({
  label,
  id,
  name,
  value,
  type,
  placeholder,
  onChange,
  className,
  required,
  ...rest
}: ITextAreaExternalStateProps) => {
  return (
    <div className='flex w-full max-w-xl flex-col items-start justify-center gap-4 p-2 py-4'>
      <label
        htmlFor={name}
        className='block text-base font-medium leading-6 text-gray-900 sm:text-lg md:text-xl lg:text-2xl'
      >
        {label}
      </label>
      <textarea
        rows={4}
        name={name}
        id={id}
        required={required}
        placeholder={placeholder}
        className={cn(
          'block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          className,
        )}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  );
};
