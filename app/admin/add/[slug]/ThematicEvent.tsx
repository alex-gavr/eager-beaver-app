'use client';
import { SetStateAction, useState } from 'react';
import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Button from '@/components/buttons/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import { Images, TThematicEvents, insertThematicEventsSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import { TwoColumns } from '@/components/home/thematic-events/two-columns';

interface IThematicEventProps {}
const defaultHeading = 'New Thematic Event!';
const defaultParagraph = 'Create a new Thematic Event!';
const defaultImageSide = 'left';
const defaultImages = [
  {
    image: 'https://uploadthing.com/f/35d4843a-ad1a-4ad2-9ee1-2d1a4d7066bb_christmas8.webp',
  },
  {
    image: 'https://uploadthing.com/f/96ec1a0c-a38c-45a0-b50e-38372e4e3160_christmas9.webp',
  },
  {
    image: 'https://uploadthing.com/f/116dccf3-84ad-4d83-af15-276b994905df_elfs8.webp',
  },
];

const ThematicEvent = ({}: IThematicEventProps) => {
  const [heading, setHeading] = useState<string>(defaultHeading);
  const [paragraph, setParagraph] = useState<string>(defaultParagraph);
  const [images, setImages] = useState<Array<Images>>(defaultImages);
  const [imageSide, setImageSide] = useState<'left' | 'right'>(defaultImageSide);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imagesToPass = JSON.stringify(images);

    const data: TThematicEvents = {
      uuid: uuid(),
      heading,
      paragraph,
      images: imagesToPass,
      imageSide,
    };

    const validatedDate = await toast.promise(
      insertThematicEventsSchema.parseAsync(data),
      {
        pending: 'Проверяю данный...',
        success: 'Данные корректны 👍',
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
        fetch('/api/admin/add/thematic-event', options),
        {
          pending: 'Добавляем новое тематическое мероприятие...',
          success: 'Новое тематическое мероприятие добавлено 😍',
          error: 'Ошибка 🤯',
        },
        {
          autoClose: 5000,
          theme: 'dark',
        },
      )
      .then((res) => res.json());

    console.log(res);
    if (res.status === 200) {
      setHeading(defaultHeading);
      setParagraph(defaultParagraph);
      setImages(defaultImages);
      setImageSide(defaultImageSide);
    }
    if (res.status === 500 || res.status === 400) {
      toast.error('Ошибка! Попробуйте еще раз', {
        theme: 'dark',
      });
    }
  };

  const inputs = [
    {
      id: 1,
      name: 'heading',
      label: 'Заголовок',
      type: 'text',
      value: heading,
      onChange: (e: { target: { value: SetStateAction<string> } }) => setHeading(e.target.value),
      required: true,
      placeholder: 'Введи заголовок',
      inputType: 'input',
      // classNameDiv: 'w-full bg-red-200',
    },
  ];

  const radios = [
    {
      id: 3,
      label: 'Слева',
      name: 'imageSide',
      type: 'radio',
      // value: imageSide,
      onChange: () => setImageSide('left'),
    },
    {
      id: 4,
      label: 'Справа',
      name: 'imageSide',
      type: 'radio',
      // value: imageSide,
      onChange: () => setImageSide('right'),
    },
  ];
  const textarea = [
    {
      id: 2,
      name: 'description',
      label: 'Параграф',
      type: 'textarea',
      value: paragraph,
      onChange: (e: { target: { value: SetStateAction<string> } }) => setParagraph(e.target.value),
      required: true,
      placeholder: 'Введи параграф',
      inputType: 'textarea',
    },
  ];

  return (
    <>
      <h1 className='mb-8 text-center text-4xl'>Добавление нового тематического мероприятия</h1>
      <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-10 p-2 md:flex-row'>
        <form
          className='z-50 order-2 flex h-full w-full min-w-[300px] max-w-[400px] flex-1 flex-col items-start justify-start rounded-xl bg-violet-200 '
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-1 '>
            {inputs.map((input) => (
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
            ))}

            <div className='flex flex-col items-start justify-center border-b-2 border-emerald-800 pb-4'>
              <p className='mb-4 text-xl md:text-2xl'>С какой стороны изображать фотографии ?</p>
              <div className='flex flex-row gap-2'>
                {radios.map((radio) => (
                  <InputExternalState
                    label={radio.label}
                    name={radio.name}
                    // value={radio.value}
                    type={radio.type}
                    onChange={radio.onChange}
                    key={radio.id}
                    id={radio.name}
                  />
                ))}
              </div>
            </div>

            {textarea.map((textarea) => (
              <TextAreaExternalState
                label={textarea.label}
                name={textarea.name}
                value={textarea.value}
                type={textarea.type}
                placeholder={textarea.placeholder}
                onChange={textarea.onChange}
                key={textarea.id}
                id={textarea.name}
              />
            ))}
            <div className='flex flex-col items-start justify-center gap-4'>
              <p className='block text-base font-medium leading-6 text-gray-900 dark:text-gray-900 sm:text-lg md:text-xl lg:text-2xl'>
                Фоточки
              </p>
              <UploadDropzone<OurFileRouter>
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log('Files: ', res);
                  if (res) {
                    const images = res.map((file) => {
                      return {
                        image: file.fileUrl,
                      };
                    }) as Array<Images>;

                    images.map((image) => {
                      setImages([...images, image]);
                    });
                    toast.success('фотографии успешно загружены', { theme: 'dark' });
                  }
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                  toast.error(`Ошибка! ${error.message}. Точно все файлы менее 512кб ?`, { theme: 'dark' });
                }}
              />
            </div>
          </div>

          <Button disabled={false} className='my-6 place-self-center'>
            Добавить
          </Button>
        </form>
        <div className='flex flex-col items-center justify-center rounded-md bg-gray-100 p-4'>
          <TwoColumns
            heading={heading}
            paragraph={paragraph}
            imageSide={imageSide}
            images={images}
            alt='whatever'
          />
        </div>
      </div>
    </>
  );
};

export default ThematicEvent;
