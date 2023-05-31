'use client';
import { SetStateAction, useState } from 'react';
import Button from '@/components/buttons/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import { TFaq, insertFaqSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import FAQComponent from '@/components/faq/faq-component';

interface ITeacherProps {}

const defaultQuestion = 'Какой-нибудь заумный вопрос';
const defaultDescription =
  'Руководитель школы, преподаватель английского и китайского языков. Стаж работы: 6 лет. Валерия может заинтересовать любого ученика. На её занятиях дети всегда сконцентрированы и внимательны.';

const Faq = ({}: ITeacherProps) => {
  const [question, setQuestion] = useState<string>(defaultQuestion);
  const [description, setDescription] = useState<string>(defaultDescription);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: TFaq = {
      uuid: uuid(),
      question,
      description,
    };

    const validatedDate = await toast.promise(
      insertFaqSchema.parseAsync(data),
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
        fetch('/api/admin/add/faq', options),
        {
          pending: 'Добавляем faq...',
          success: 'Успех! Вопрос и ответ добавлен 🥰',
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
      setQuestion('Еще какие нибудь вопросы есть?)');
      setDescription(defaultDescription);
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
      name: 'question',
      label: 'Вопрос',
      type: 'text',
      value: question,
      onChange: (e: { target: { value: SetStateAction<string> } }) => setQuestion(e.target.value),
      required: true,
      placeholder: 'Введите вопрос',
      inputType: 'input',
      classNameDiv: 'w-full',
    },
    {
      id: 2,
      name: 'description',
      label: 'Описание',
      type: 'textarea',
      value: description,
      onChange: (e: { target: { value: SetStateAction<string> } }) => setDescription(e.target.value),
      required: true,
      placeholder: 'Введите описание',
      inputType: 'textarea',
    },
  ];

  return (
    <>
      <h1 className='mb-8 text-center text-4xl'>Добавление нового учителя</h1>
      <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-10 p-2 md:flex-row '>
        <form
          className='z-50 order-2 flex w-full min-w-[300px] max-w-[400px] flex-col items-start justify-start rounded-xl bg-violet-200 p-4'
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
                classNameDiv={input.classNameDiv}
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
          <Button variant={'primary'} disabled={false} className='my-6 place-self-center'>
            Добавить новый вопрос / ответ
          </Button>
        </form>
        <div className='flex w-full flex-col items-center justify-center'>
          <FAQComponent question={question} description={description} />
        </div>
      </div>
    </>
  );
};

export default Faq;
