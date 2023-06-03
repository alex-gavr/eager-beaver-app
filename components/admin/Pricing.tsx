'use client';
import { ChangeEvent, useState } from 'react';
import Button from '@/components/buttons/button';
import { toast } from 'react-toastify';
import { InputExternalState } from '@/components/input/InputExternalState';
import { TPrices, insertPriceSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import PriceCard from '@/components/prices/PriceCard';
import { getPromiseTextAdd, getPromiseTextEdit, toastConfig } from '@/utils/toast/toastConfig';
import { ZodError } from 'zod';
import ToastCustomError from '../ToastCustomError';
import { addPrice, updatePrice } from '@/app/admin/adminServerActions';

interface IReviewProps {
  dbData?: TPrices;
}

const defaultPriceName = 'Default Price Name';
const defaultPrice = '500 млн долларов';
const defaultCardColor = 'green';
const defaultFeature1 = 'Default Feature 1';
const defaultFeature2 = 'Default Feature 2';
const defaultFeature3 = 'Default Feature 3';

const Pricing = ({ dbData }: IReviewProps) => {
  const [priceName, setPriceName] = useState<string>(dbData?.priceName ?? defaultPriceName);
  const [price, setPrice] = useState<string>(dbData?.price ?? defaultPrice);
  const [cardColor, setCardColor] = useState<'green' | 'yellow'>(dbData?.cardColor ?? defaultCardColor);
  const [feature1, setFeature1] = useState<string>(dbData?.feature1 ?? defaultFeature1);
  const [feature2, setFeature2] = useState<string>(dbData?.feature2 ?? defaultFeature2);
  const [feature3, setFeature3] = useState<string>(dbData?.feature3 ?? defaultFeature3);

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

    if (dbData !== undefined && updatePrice) {
      const data: TPrices = {
        uuid: dbData.uuid,
        priceName,
        price,
        cardColor,
        feature1,
        feature2,
        feature3,
      };
      const validPrice = await toast.promise(
        insertPriceSchema.parseAsync(data),
        {
          pending: 'Проверяю данный...',
          success: 'Данные корректны 👍',
          error: {
            render({ data }) {
              const error = data as ZodError;
              return <ToastCustomError error={error} />;
            },
          },
        },
        toastConfig,
      );
      // Update entry
      const res = await toast.promise(updatePrice(validPrice), getPromiseTextEdit('prices'), toastConfig);

      if (res === 200) {
        console.log('success');
      }
      if (res === 500) {
        toast.error('Ошибка! Попробуйте еще раз', {
          theme: 'dark',
        });
      }
    } else if (addPrice) {
      const data: TPrices = {
        uuid: uuid(),
        priceName,
        price,
        cardColor,
        feature1,
        feature2,
        feature3,
      };
      const validPrice = await toast.promise(
        insertPriceSchema.parseAsync(data),
        {
          pending: 'Проверяю данный...',
          success: 'Данные корректны 👍',
          error: {
            render({ data }) {
              const error = data as ZodError;
              return <ToastCustomError error={error} />;
            },
          },
        },
        toastConfig,
      );
      // Update entry
      const res = await toast.promise(addPrice(validPrice), getPromiseTextAdd('prices'), toastConfig);

      if (res === 200) {
        setPriceName(defaultPriceName);
        setPrice(defaultPrice);
        setCardColor(defaultCardColor);
        setFeature1(defaultFeature1);
        setFeature2(defaultFeature2);
        setFeature3(defaultFeature3);
      }
      if (res === 500) {
        toast.error('Ошибка! Попробуйте еще раз', {
          theme: 'dark',
        });
      }
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

  const radios = [
    {
      id: 3,
      label: 'Зеленая',
      name: 'cardColor',
      defaultChecked: cardColor === 'green' ? true : false,
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
      defaultChecked: cardColor === 'yellow' ? true : false,
      type: 'radio',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setCardColor('yellow'),
      inputType: 'input',
      className: '',
      require: false,
    },
  ];

  return (
    <>
      <h1 className='mb-8 text-center text-4xl'>
        {dbData === undefined ? 'Добавление нового тарифа' : 'Редактирование тарифа'}
      </h1>
      <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-10 p-2 md:flex-row '>
        <form
          className='z-50 order-2 flex h-full w-full min-w-[300px] max-w-[400px] flex-col items-start justify-start rounded-xl bg-violet-200 dark:bg-violet-950'
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
          <hr className='h-1 w-11/12 place-self-center rounded-sm bg-violet-700 ' />
          <div className='flex w-full flex-col items-start justify-start p-2'>
            <p className='w-full text-center dark:text-gray-300 lg:text-2xl'>Какой цвет карточки?</p>
            <div className='flex w-full flex-row items-center justify-evenly'>
              {radios.map((input, index) => (
                <InputExternalState
                  id={input.name}
                  key={input.id}
                  label={input.label}
                  name={input.name}
                  defaultChecked={input.defaultChecked}
                  type={input.type}
                  required={input.require}
                  onChange={input.onChange}
                  className={input.className}
                />
              ))}
            </div>
          </div>

          <div className='flex w-full flex-col items-center justify-center'>
            <Button disabled={false} variant={'primary'} className='z-50 my-6 place-self-center'>
              {dbData === undefined ? 'Добавить новый тариф' : 'Редактировать тарифа'}
            </Button>
          </div>
        </form>
        <div className='flex flex-1 flex-col items-center justify-center'>
          <PriceCard price={data[0]} />
        </div>
      </div>
    </>
  );
};

export default Pricing;
