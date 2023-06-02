import Input from '@/components/input/Input';
import { db } from '@/db/db';
import { futureEvents, insertUserSchema, users } from '@/db/schemas';
import { userEventSignUpMessage } from '@/utils/formTelMessage';
import getIsTestVariable from '@/utils/getIsTestVariable';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import { handleSubmit } from '../actions';
// import { handleSubmit, handleSubmitEvent } from '../actions';

interface IFormProps {
  event?: boolean;
  searchParams?: {
    uuid: string;
  };
}

const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const chatIDLera = process.env.NEXT_PUBLIC_TELEGRAM_LERA_ID;
const chatIDGavr = process.env.NEXT_PUBLIC_TELEGRAM_GAVR_ID;

const Form = ({ searchParams }: IFormProps) => {
  const submitAction = searchParams?.uuid === undefined ? handleSubmit : handleSubmitEvent;

  async function handleSubmitEvent(formData: FormData) {
    'use server';

    if (searchParams === undefined || searchParams?.uuid === undefined) {
      return null;
    }

    const name = formData.get('name');
    const phone = formData.get('phone');

    if (name === null || phone === null) {
      return null;
    }

    const eventId = searchParams?.uuid;

    const fullEventData = await db.select().from(futureEvents).where(eq(futureEvents.uuid, eventId));

    if (fullEventData.length === 0) {
      return;
    }
    const userFromBody = {
      uuid: uuid(),
      personName: name,
      phone: phone,
    };

    const userData = await insertUserSchema.parseAsync(userFromBody).catch((e) => {
      throw new Error(e.message);
    });

    const message = userEventSignUpMessage(
      userData.personName,
      userData.phone,
      fullEventData[0].eventName,
      fullEventData[0].eventStart.toLocaleDateString(),
    );
    const isTest = getIsTestVariable(userData.personName, userData.phone);

    if (isTest) {
      const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
      const telegramGavr = fetch(url);
      const addUserToDb = db.insert(users).values(userData);
      const decreaseSpotsAvailable = db
        .update(futureEvents)
        .set({ participants: fullEventData[0].participants + 1 })
        .where(eq(futureEvents.uuid, eventId));

      const [telegramResult, dbResult, spotDecreaseResult] = await Promise.all([
        telegramGavr,
        addUserToDb,
        decreaseSpotsAvailable,
      ]);
      const status = telegramResult.status;
      const dbStatus = dbResult.rowsAffected;
      const spotDecreaseStatus = spotDecreaseResult.rowsAffected;
      console.log(status, dbStatus, spotDecreaseStatus);

      if (status === 200) {
        // TODO: Revalidate the path doesn't work
        // revalidatePath('/schedule');
        redirect('/form-success');
      } else {
        redirect('/form-error');
      }
      // TODO: CREATE PRODUCTION VERSION
    }
  }

  const inputsData = [
    {
      key: 1,
      id: 'name',
      type: 'text',
      label: 'Имя',
      name: 'name',
      placeholder: 'Валерия',
    },
    {
      key: 2,
      id: 'phone',
      type: 'tel',
      label: 'Телефон',
      name: 'phone',
      placeholder: '(999)-999-99-99',
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
      <form action={submitAction} className='flex flex-col items-center justify-center p-4'>
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
            />
          ))}
        </div>
        {/* <Button className='mt-10'>Submit</Button> */}
      </form>
      <p className=' w-2/3 text-center text-xs underline underline-offset-2 lg:w-5/6 '>
        Нажимая кнопку, вы даёте согласие на обработку своих персональных данных
      </p>{' '}
    </div>
  );
};

export default Form;
