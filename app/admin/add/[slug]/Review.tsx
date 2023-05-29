'use client';
import { SetStateAction, useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Button from '@/components/buttons/button';
import { ToastContainer, toast } from 'react-toastify';
import { ReviewCard } from '@/components/review-card/review-card';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import { TReviews, insertReviewSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';

interface IReviewProps {}
const defaultImage = 'https://uploadthing.com/f/dce2908f-3242-4484-a512-24b3a04ad8c4_lera.webp';
const defaultName = 'Валерия Евстратова';
const defaultReview =
  'Руководитель школы, преподаватель английского и китайского языков. Стаж работы: 6 лет. Валерия может заинтересовать любого ученика. На её занятиях дети всегда сконцентрированы и внимательны.';

const Review = ({}: IReviewProps) => {
  const [childName, setChildName] = useState<string>(defaultName);
  const [parentName, setParentName] = useState<string>('Мама и папа');
  const [relationToChild, setRelationToChild] = useState<string>('Мама и папа');
  const [review, setReview] = useState<string>(defaultReview);
  const [image, setImage] = useState<string>('');

  // const [success, setSuccess] = useState<boolean | null>(null);
  // const [error, setError] = useState<boolean | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string>('');
  // console.log(preview);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: TReviews = {
      uuid: uuid(),
      childName,
      parentName,
      relationToChild,
      review,
      image,
    };

    const validatedDate = await toast.promise(
      insertReviewSchema.parseAsync(data),
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
        fetch('/api/admin/add/review', options),
        {
          pending: 'Добавляем отзыв...',
          success: 'Успех! Отзыв добавлен 🥰',
          error: 'Ошибка 🤯',
        },
        {
          autoClose: 5000,
          theme: 'dark',
        },
      )
      .then((res) => res.json());

    if (res.status === 200) {
      setChildName('Еще кого нибудь добавим или хватит?');
      setReview(defaultReview);
      setImage(defaultImage);
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
      <h1 className='mb-8 text-center text-4xl'>Добавление нового отзыва</h1>
      <div className='grid grid-cols-1 gap-10 p-2 lg:grid-cols-2'>
        <form
          className='order-2 flex w-full min-w-[300px] max-w-xl flex-1 flex-col items-start justify-start  rounded-xl bg-slate-200'
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

          <div className='flex w-full flex-row items-start justify-center gap-4 px-4 py-2'>
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
          <Button disabled={image.length === 0} className='my-6 place-self-center'>
            Добавить новый отзыв
          </Button>
        </form>
        <ReviewCard
          image={image ? image : defaultImage}
          name={childName}
          parent={parentName}
          relationToChild={relationToChild}
          review={review}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Review;
