'use client';
import { SetStateAction, useState } from 'react';
import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Button from '@/components/buttons/button';
import { toast } from 'react-toastify';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import { IEventsData, Images, TThematicEvents, insertThematicEventsSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import TwoColumnsNoAni from '@/components/home/thematic-events/twoColNoAni';
import { getPromiseTextAdd, getPromiseTextEdit, toastConfig } from '@/utils/toast/toastConfig';
import { ZodError } from 'zod';
import ToastCustomError from '../ToastCustomError';

interface IThematicEventProps {
  dbData?: IEventsData;
  updateThematicEvent?: (data: any) => Promise<number>;
  addThematicEvent?: (data: any) => Promise<number>;
}
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

const ThematicEvent = ({ dbData, updateThematicEvent, addThematicEvent }: IThematicEventProps) => {
  const [heading, setHeading] = useState<string>(dbData?.heading ?? defaultHeading);
  const [paragraph, setParagraph] = useState<string>(dbData?.paragraph ?? defaultParagraph);
  const [images, setImages] = useState<Array<Images>>(dbData?.images ?? defaultImages);
  const [imageSide, setImageSide] = useState<'left' | 'right'>(dbData?.imageSide ?? defaultImageSide);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dbData && updateThematicEvent) {
      const imagesToPass = JSON.stringify(images);
      const data: TThematicEvents = {
        uuid: dbData.uuid,
        heading,
        paragraph,
        images: imagesToPass,
        imageSide,
      };

      const validThematicEvent = await toast.promise(
        insertThematicEventsSchema.parseAsync(data),
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
      const res = await toast.promise(
        updateThematicEvent(validThematicEvent),
        getPromiseTextEdit('futureEvents'),
        toastConfig,
      );

      if (res === 200) {
        console.log('success');
      }
      if (res === 500) {
        toast.error('Ошибка! Попробуйте еще раз', {
          theme: 'dark',
        });
      }
    } else if (addThematicEvent) {
      const imagesToPass = JSON.stringify(images);
      const data: TThematicEvents = {
        uuid: uuid(),
        heading,
        paragraph,
        images: imagesToPass,
        imageSide,
      };
      // const res = await handleAddEntry('thematicEvents', data);

      const validThematicEvent = await toast.promise(
        insertThematicEventsSchema.parseAsync(data),
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

      const res = await toast.promise(
        addThematicEvent(validThematicEvent),
        getPromiseTextAdd('futureEvents'),
        toastConfig,
      );

      if (res === 200) {
        setHeading(defaultHeading);
        setParagraph(defaultParagraph);
        setImages(defaultImages);
        setImageSide(defaultImageSide);
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
      defaultChecked: imageSide === 'left' ? true : false,
      // value: imageSide,
      onChange: () => setImageSide('left'),
    },
    {
      id: 4,
      label: 'Справа',
      name: 'imageSide',
      type: 'radio',
      defaultChecked: imageSide === 'right' ? true : false,
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
      <h1 className='mb-8 text-center text-4xl'>
        {' '}
        {dbData === undefined ? 'Добавление нового тематического мероприятия' : 'Изменение мероприятия'}
      </h1>
      <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-10 p-2 md:flex-row'>
        <form
          className='z-50 order-2 flex h-full w-full min-w-[300px] max-w-[400px] flex-1 flex-col items-start justify-start rounded-xl bg-violet-200 dark:bg-violet-950'
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
              <p className='mb-4 text-xl md:text-2xl dark:text-neutral-300'>С какой стороны изображать фотографии ?</p>
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
                    defaultChecked={radio.defaultChecked}
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
              <p className='block text-base font-medium leading-6 text-gray-900 sm:text-lg md:text-xl lg:text-2xl dark:text-neutral-300'>
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
            {dbData === undefined ? 'Добавить' : 'Изменить'}
          </Button>
        </form>
        <div className='flex flex-col items-center justify-center rounded-md bg-gray-100 p-4 dark:bg-gray-900'>
          <TwoColumnsNoAni
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
