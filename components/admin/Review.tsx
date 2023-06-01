'use client';
import { SetStateAction, useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Button from '@/components/buttons/button';
import { toast } from 'react-toastify';
import { ReviewCard } from '@/components/review-card/review-card';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import { TReviews, insertReviewSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import { getPromiseTextAdd, getPromiseTextEdit, toastConfig } from '@/utils/toast/toastConfig';
import { ZodError } from 'zod';
import ToastCustomError from '../ToastCustomError';

interface IReviewProps {
  dbData?: TReviews;
  updateReview?: (data: any) => Promise<number>;
  addReview?: (data: any) => Promise<number>;
}
const defaultImage = 'https://uploadthing.com/f/dce2908f-3242-4484-a512-24b3a04ad8c4_lera.webp';
const defaultName = 'Валерия Евстратова';
const defaultParentName = 'Мамуля и папуля';
const defaultReview =
  'Руководитель школы, преподаватель английского и китайского языков. Стаж работы: 6 лет. Валерия может заинтересовать любого ученика. На её занятиях дети всегда сконцентрированы и внимательны.';

const Review = ({ dbData, updateReview, addReview }: IReviewProps) => {
  const [childName, setChildName] = useState<string>(dbData?.childName ?? defaultName);
  const [parentName, setParentName] = useState<string>(dbData?.parentName ?? defaultParentName);
  const [relationToChild, setRelationToChild] = useState<string>(
    dbData?.relationToChild ?? defaultParentName,
  );
  const [review, setReview] = useState<string>(dbData?.review ?? defaultReview);
  const [image, setImage] = useState<string>(dbData?.image ?? defaultImage);

  // const [success, setSuccess] = useState<boolean | null>(null);
  // const [error, setError] = useState<boolean | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string>('');
  // console.log(preview);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dbData && updateReview) {
      const data: TReviews = {
        uuid: dbData.uuid,
        childName,
        parentName,
        relationToChild,
        review,
        image,
      };
      const validReview = await toast.promise(
        insertReviewSchema.parseAsync(data),
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
      const res = await toast.promise(updateReview(validReview), getPromiseTextEdit('reviews'), toastConfig);

      if (res === 200) {
        console.log('success');
      }
      if (res === 500) {
        toast.error('Ошибка! Попробуйте еще раз', {
          theme: 'dark',
        });
      }
    } else if (addReview) {
      const data: TReviews = {
        uuid: uuid(),
        childName,
        parentName,
        relationToChild,
        review,
        image,
      };

      const validReview = await toast.promise(
        insertReviewSchema.parseAsync(data),
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
      const res = await toast.promise(addReview(validReview), getPromiseTextAdd('reviews'), toastConfig);

      if (res === 200) {
        setChildName(defaultName);
        setParentName(defaultParentName);
        setRelationToChild(defaultParentName);
        setReview(defaultReview);
        setImage(defaultImage);
      }
      if (res === 500) {
        toast.error('Ошибка! Попробуйте еще раз', {
          theme: 'dark',
        });
      }
    }
  };

  const inputs = [
    {
      id: 1,
      label: 'Имя ребенка',
      name: 'name',
      value: childName,
      type: 'text',
      placeholder: 'Введи имя ребенка',
      onChange: (e: { target: { value: SetStateAction<string> } }) => setChildName(e.target.value),
      inputType: 'input',
    },
    {
      id: 2,
      label: 'Имя родителя',
      name: 'description',
      value: parentName,
      type: 'text',
      placeholder: 'Введи имя родителя',
      onChange: (e: { target: { value: SetStateAction<string> } }) => setParentName(e.target.value),
      inputType: 'input',
    },
    {
      id: 3,
      label: 'Кем приходится ребёнок родителю',
      name: 'relationToChild',
      value: relationToChild,
      type: 'text',
      placeholder: 'Введи отношение ',
      onChange: (e: { target: { value: SetStateAction<string> } }) => setRelationToChild(e.target.value),
      inputType: 'input',
    },
    {
      id: 4,
      label: 'Отзыв',
      name: 'review',
      value: review,
      type: 'text',
      placeholder: 'Введи отзыв',
      onChange: (e: { target: { value: SetStateAction<string> } }) => setReview(e.target.value),
      inputType: 'textarea',
    },
  ];

  return (
    <>
      <h1 className='mb-8 text-center text-4xl'>
        {' '}
        {dbData === undefined ? 'Добавление нового отзыва' : 'Изменение отзыва'}
      </h1>
      <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-10 p-2 md:flex-row '>
        <form
          className='order-2 col-span-3 flex h-full w-full min-w-[300px] max-w-[400px] flex-1 flex-col items-start justify-start overflow-y-auto rounded-xl bg-violet-200'
          onSubmit={handleSubmit}
        >
          {inputs.map((input, index) => {
            return input.inputType === 'input' ? (
              <InputExternalState
                label={input.label}
                name={input.name}
                value={input.value}
                type={input.type}
                placeholder={input.placeholder}
                onChange={input.onChange}
                key={input.id}
                id={input.name}
              />
            ) : (
              <TextAreaExternalState
                label={input.label}
                name={input.name}
                value={input.value}
                type={input.type}
                placeholder={input.placeholder}
                onChange={input.onChange}
                key={input.id}
                id={input.name}
              />
            );
          })}

          <div className='flex w-full flex-col items-start justify-center gap-4 px-4 py-2'>
            <p className='block text-base font-medium leading-6 text-gray-900 dark:text-gray-900 sm:text-lg md:text-xl lg:text-2xl'>
              Фоточка
            </p>
            <UploadButton<OurFileRouter>
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log('Files: ', res);
                if (res) {
                  setImage(res[0].fileUrl);
                }
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <Button variant={'primary'} disabled={image.length === 0} className='my-6 place-self-center'>
            {dbData === undefined ? 'Добавить новый отзыв' : 'Изменить отзыв'}
          </Button>
        </form>
        <div className='flex max-w-3xl flex-1 flex-col items-center justify-center'>
          <ReviewCard
            image={image ? image : defaultImage}
            name={childName}
            parent={parentName}
            relationToChild={relationToChild}
            review={review}
          />
        </div>
      </div>
    </>
  );
};

export default Review;
