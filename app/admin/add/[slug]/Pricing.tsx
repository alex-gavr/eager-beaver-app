'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@/components/buttons/button';
import { ToastContainer, toast } from 'react-toastify';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import {
  TFutureEvents,
  TPrices,
  TReviews,
  insertFutureEventsSchema,
  insertPriceSchema,
  insertReviewSchema,
} from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import EventCard from '@/components/future-events/event-card/EventCard';
import SwiperCards from '@/components/prices/SwiperCards';

interface IReviewProps {}

const defaultPriceName = 'Default Price Name';
const defaultPrice = '500 млн долларов';
const defaultCardColor = 'green';
const defaultFeature1 = 'Default Feature 1';
const defaultFeature2 = 'Default Feature 2';
const defaultFeature3 = 'Default Feature 3';

const Pricing = ({}: IReviewProps) => {
  const [priceName, setPriceName] = useState<string>(defaultPriceName);
  const [price, setPrice] = useState<string>(defaultPrice);
  const [cardColor, setCardColor] = useState<'green' | 'yellow'>(defaultCardColor);
  const [feature1, setFeature1] = useState<string>(defaultFeature1);
  const [feature2, setFeature2] = useState<string>(defaultFeature2);
  const [feature3, setFeature3] = useState<string>(defaultFeature3);

  const data = [
    {
      uuid: '1',
      priceName,
      price,
      cardColor,
      feature1,
      feature2,
      feature3,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: TPrices = {
      uuid: uuid(),
      priceName,
      price,
      cardColor,
      feature1,
      feature2,
      feature3,
    };

    const validatedDate = await toast.promise(
      insertPriceSchema.parseAsync(data),
      {
        pending: 'Проверяю данный...',
        success: 'Данные подходят 👍',
        error: 'Ошибка 🤯',
      },
      {
        autoClose: 5000,
        theme: 'dark',
      },
    );

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_API_ROUTE_SECRET,
      },
      body: JSON.stringify(validatedDate),
    };

    const res = await toast
      .promise(
        fetch('/api/admin/add/prices', options),
        {
          pending: 'Добавляем тариф...',
          success: 'Все супер! Тариф добавлен 🥰',
          error: 'Ошибка 🤯',
        },
        {
          autoClose: 5000,
          theme: 'dark',
        },
      )
      .then((res) => res.json());

    if (res.status === 200) {
      setPriceName(defaultPriceName);
      setPrice(defaultPrice);
      setCardColor(defaultCardColor);
      setFeature1(defaultFeature1);
      setFeature2(defaultFeature2);
      setFeature3(defaultFeature3);
    }
    if (res.status === 500 || res.status === 400) {
      toast.error('Ошибка! Попробуйте еще раз', {
        theme: 'dark',
      });
    }
  };

  const inputsText = [
    {
      id: 1,
      label: 'Название тарифа',
      name: 'priceName',
      value: priceName,
      type: 'text',
      placeholder: 'Введи название тарифа',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPriceName(e.target.value),
      inputType: 'input',
      className: '',
      require: true,
    },
    {
      id: 2,
      label: 'Цена',
      name: 'price',
      value: price,
      type: 'text',
      placeholder: 'Введи цену',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value),
      inputType: 'input',
      className: '',
      require: true,
    },
    {
      id: 3,
      label: 'Зеленая',
      name: 'cardColor',
      //   value: cardColor,
      type: 'radio',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setCardColor('green'),
      inputType: 'input',
      className: 'flex-col',
      require: false,
    },
    {
      id: 4,
      label: 'Желтая',
      name: 'cardColor',
      //   value: cardColor,
      type: 'radio',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setCardColor('yellow'),
      inputType: 'input',
      className: '',
      require: false,
    },
    {
      id: 5,
      label: 'Feature 1',
      name: 'feature1',
      value: feature1,
      type: 'text',
      placeholder: 'Введи фичу 1',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setFeature1(e.target.value),
      inputType: 'input',
      className: '',
      require: true,
    },
    {
      id: 6,
      label: 'Feature 2',
      name: 'feature2',
      value: feature2,
      type: 'text',
      placeholder: 'Введи фичу 2',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setFeature2(e.target.value),
      inputType: 'input',
      className: '',
      require: true,
    },
    {
      id: 7,
      label: 'Feature 3',
      name: 'feature3',
      value: feature3,
      type: 'text',
      placeholder: 'Введи фичу 3',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setFeature3(e.target.value),
      inputType: 'input',
      className: '',
      require: true,
    },
  ];

  return (
    <>
      <h1 className='mb-8 text-center text-4xl'>Добавление нового тарифа</h1>
      <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-10 p-2 md:flex-row '>
        <form
          className='z-50 order-2 flex h-full w-full min-w-[300px] max-w-[600px] flex-col items-start justify-start rounded-xl bg-violet-200'
          onSubmit={handleSubmit}
        >
          <div className='flex w-full flex-col sm:grid sm:grid-cols-2'>
            {inputsText.map((input, index) => (
              <InputExternalState
                id={input.name}
                key={input.id}
                label={input.label}
                name={input.name}
                value={input.value}
                type={input.type}
                required={input.require}
                placeholder={input.placeholder}
                onChange={input.onChange}
                className={input.className}
              />
            ))}
          </div>

          <div className='flex w-full flex-col items-center justify-center'>
            <Button disabled={false} variant={'primary'} className='z-50 my-6 place-self-center'>
              Добавить новый тариф
            </Button>
          </div>
        </form>
        <div className='flex max-w-[350px] flex-col items-center justify-center'>
          <SwiperCards prices={data} disabled />
        </div>
      </div>
    </>
  );
};

export default Pricing;
