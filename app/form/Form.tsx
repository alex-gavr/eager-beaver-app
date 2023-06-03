'use client';
import Input from '@/components/input/Input';
import { handleSubmitBaseForm, handleSubmitEvent } from '../actions';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useAppContext } from '@/context/Context';
import { ActionsType } from '@/context/actionsTypes';

interface IFormProps {
  event?: boolean;
  searchParams?: {
    uuid: string;
  };
}

const Form = ({ searchParams }: IFormProps) => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const { dispatch } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (searchParams?.uuid !== undefined) {
      dispatch({ type: ActionsType.setEventUpdated, payload: false });
      const res = await handleSubmitEvent(name, phone, searchParams.uuid);
      if (res === 200) {
        dispatch({ type: ActionsType.setEventUpdated, payload: true });
        setCookie('name', name, { path: '/', maxAge: 60 * 60 * 24 * 365, secure: true, sameSite: 'lax' });
        setCookie('enrolled', searchParams.uuid, {
          path: '/',
          maxAge: 60 * 60,
          secure: true,
          sameSite: 'lax',
        });
        router.push('/form-success');
        setLoading(false);
      } else {
        router.push('/form-error');
        setLoading(false);
      }
    } else {
      const res = await handleSubmitBaseForm(name, phone);
      if (res === 200) {
        setCookie('name', name, { path: '/', maxAge: 60 * 60 * 24 * 365, secure: true, sameSite: 'lax' });
        router.push('/form-success');
        setLoading(false);
      } else {
        router.push('/form-error');
        setLoading(false);
      }
    }
  };

  const inputsData = [
    {
      key: 1,
      id: 'name',
      type: 'text',
      label: 'Имя',
      name: 'name',
      placeholder: 'Валерия',
      required: true,
      value: name,
      setValue: setName,
      loading: loading,
    },
    {
      key: 2,
      id: 'phone',
      type: 'tel',
      label: 'Телефон',
      name: 'phone',
      placeholder: '(999)-999-99-99',
      required: true,
      value: phone,
      setValue: setPhone,
      loading: loading,
    },
  ];

  const baseInputStyles =
    'border-0 block w-full rounded-md py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 lg:text-2xl';
  const invalidInputStyles =
    'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500';
  const validInputStyles = 'valid:ring-green-500 focus:valid:ring-green-500';
  const peerStyle = 'peer ';

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center p-4 w-full'>
        <div className='flex w-full max-w-[400px] flex-col items-center justify-center gap-4 lg:gap-8'>
          {inputsData.map((input, index) => (
            <Input
              index={index}
              key={input.key}
              id={input.id}
              type={input.type}
              label={input.label}
              name={input.name}
              placeholder={input.placeholder}
              required={input.required}
              value={input.value}
              setValue={input.setValue}
              loading={input.loading}
            />
          ))}
        </div>
        {/* <Button className='mt-10' disabled={name === undefined || phone === undefined}>
          Submit
        </Button> */}
      </form>
      <Link className=' w-2/3 text-center text-xs underline underline-offset-2 lg:w-5/6' href={'/policy'}>
        Нажимая кнопку, вы даёте согласие на обработку своих персональных данных
      </Link>{' '}
    </div>
  );
};

export default Form;
