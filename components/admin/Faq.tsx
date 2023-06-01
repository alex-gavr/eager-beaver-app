'use client';
import { SetStateAction, useState } from 'react';
import Button from '@/components/buttons/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import { TFaq, insertFaqSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import FAQComponent from '@/components/faq/faq-component';
import { handleAddEntry } from '@/utils/handleAddEntry';
import { getPromiseTextEdit, toastConfig, toastDataValidationTexts } from '@/utils/toast/toastConfig';

interface IFaqProps {
  dbData?: TFaq;
  updateFaq?: (data: any) => Promise<number>;
}

const defaultQuestion = 'Какой-нибудь заумный вопрос';
const defaultDescription =
  'Руководитель школы, преподаватель английского и китайского языков. Стаж работы: 6 лет. Валерия может заинтересовать любого ученика. На её занятиях дети всегда сконцентрированы и внимательны.';

const Faq = ({ dbData, updateFaq }: IFaqProps) => {
  const [question, setQuestion] = useState<string>(dbData?.question ?? defaultQuestion);
  const [description, setDescription] = useState<string>(dbData?.description ?? defaultDescription);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dbData && updateFaq) {
      const data: TFaq = {
        uuid: dbData.uuid,
        question,
        description,
      };
      
      const validFaq = await toast.promise(
        insertFaqSchema.parseAsync(data),
        toastDataValidationTexts,
        toastConfig,
      );
      // Update entry
      const res = await toast.promise(updateFaq(validFaq), getPromiseTextEdit('faq'), toastConfig);

      if (res === 200) {
        console.log('success');
      }
      if (res === 500 || res === 400) {
        toast.error('Ошибка! Попробуйте еще раз', {
          theme: 'dark',
        });
      }
    } else {
      const data: TFaq = {
        uuid: uuid(),
        question,
        description,
      };
      // Add entry
      const res = await handleAddEntry('faq', data);

      if (res.status === 200) {
        setQuestion('Еще какие нибудь вопросы есть?)');
        setDescription(defaultDescription);
      }
      if (res.status === 500 || res.status === 400) {
        toast.error('Ошибка! Попробуйте еще раз', {
          theme: 'dark',
        });
      }
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
      <h1 className='mb-8 text-center text-4xl'>
        {dbData === undefined ? 'Добавление нового FAQ' : 'Корректирование FAQ'}
      </h1>
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
            {dbData === undefined ? 'Добавить новый FAQ' : 'Корректировать FAQ'}
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
