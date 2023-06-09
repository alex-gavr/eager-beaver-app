'use client';
import TeacherCard from '@/components/teacher-card/teacher-card';
import { SetStateAction, useMemo, useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Button from '@/components/buttons/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import { TTeachers, insertTeacherSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import { getPromiseTextAdd, getPromiseTextEdit, toastConfig } from '@/utils/toast/toastConfig';
import { ZodError } from 'zod';
import ToastCustomError from '../ToastCustomError';
import { addTeacher, updateTeacher } from '@/app/admin/adminServerActions';

interface ITeacherProps {
  dbData?: TTeachers;
}

const defaultName = 'Валерия Евстратова';
const defaultDescription =
  'Руководитель школы, преподаватель английского и китайского языков. Стаж работы: 6 лет. Валерия может заинтересовать любого ученика. На её занятиях дети всегда сконцентрированы и внимательны.';
const defaultImage = 'https://uploadthing.com/f/dce2908f-3242-4484-a512-24b3a04ad8c4_lera.webp';

const Teacher = ({ dbData }: ITeacherProps) => {
  const [name, setName] = useState(dbData?.fullName ?? defaultName);
  const [description, setDescription] = useState(dbData?.description ?? defaultDescription);
  const [preview, setPreview] = useState(dbData?.image ?? defaultImage);

  const imageToDisplay = useMemo(() => {
    if (preview) {
      return preview;
    } else {
      return defaultImage;
    }
  }, [preview, defaultImage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dbData && updateTeacher) {
      const data: TTeachers = {
        uuid: dbData.uuid,
        fullName: name,
        description,
        image: preview,
      };
      const validTeacher = await toast.promise(
        insertTeacherSchema.parseAsync(data),
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
        updateTeacher(validTeacher),
        getPromiseTextEdit('teachers'),
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
    } else if (addTeacher) {
      const data: TTeachers = {
        uuid: uuid(),
        fullName: name,
        description,
        image: preview,
      };

      const validTeacher = await toast.promise(
        insertTeacherSchema.parseAsync(data),
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

      const res = await toast.promise(addTeacher(validTeacher), getPromiseTextAdd('teachers'), toastConfig);
      if (res === 200) {
        setName('Еще кого нибудь добавим или хватит?');
        setDescription(defaultDescription);
        setPreview(defaultImage);
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
      label: 'Имя',
      name: 'name',
      value: name,
      type: 'text',
      placeholder: 'Введи имя учителя',
      onChange: (e: { target: { value: SetStateAction<string> } }) => setName(e.target.value),
      inputType: 'input',
    },
    {
      id: 2,
      label: 'Описание',
      name: 'description',
      value: description,
      type: 'text',
      placeholder: 'Введи описание учителя',
      onChange: (e: { target: { value: SetStateAction<string> } }) => setDescription(e.target.value),
      inputType: 'textarea',
    },
  ];

  return (
    <>
      <h1 className='mb-8 text-center text-4xl'>
        {' '}
        {dbData === undefined ? 'Добавление нового учителя' : `Редактирование учителя`}
      </h1>
      <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-10 p-2 md:flex-row'>
        <form
          className='order-2 flex h-full w-full min-w-[300px] max-w-[400px] flex-1 flex-col items-start justify-start rounded-xl bg-violet-200 dark:bg-violet-950'
          onSubmit={handleSubmit}
        >
          {inputs.map((input) => {
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
          <div className='flex w-full flex-col items-center justify-center gap-4 px-4 py-2'>
            <p className='block text-base font-medium leading-6 text-gray-900 dark:text-gray-200 sm:text-lg md:text-xl lg:text-2xl'>
              Фоточка
            </p>
            <UploadButton<OurFileRouter>
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log('Files: ', res);
                if (res) {
                  setPreview(res[0].fileUrl);
                }
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <Button variant={'primary'} disabled={preview.length === 0} className='my-6 place-self-center'>
            {dbData === undefined ? 'Добавить нового учителя ' : 'Редактировать учителя'}
          </Button>
        </form>
        <div className='flex flex-1 flex-col items-center justify-center'>
          <TeacherCard image={imageToDisplay} name={name} description={description} alt={name} includePlay />
        </div>
      </div>
    </>
  );
};

export default Teacher;
