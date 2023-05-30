'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@/components/buttons/button';
import { ToastContainer, toast } from 'react-toastify';
import { InputExternalState, TextAreaExternalState } from '@/components/input/InputExternalState';
import { TFutureEvents, insertFutureEventsSchema } from '@/db/schemas';
import { v4 as uuid } from 'uuid';
import EventCard from '@/components/future-events/event-card/EventCard';

interface IReviewProps {}
const millisecondsPerDay = 1000 * 60 * 60 * 24;
const defaultEventName = 'Лучшие событие года';
const defaultEventDescription =
  'На этой вечеринке можно ощутить дух безудержного веселья и свободы. Место проведения оформлено в соответствии с темой вечера и украшено яркими цветами, красочными фонарями и увлекательными декорациями. Музыкальное сопровождение включает самые актуальные и популярные треки, которые заставляют людей танцевать и петь вместе.';
const defaultAge = 'от 6 лет';
const defaultParticipants = 0;
const defaultSpots = 8;
const defaultPrice = '5000 рублей';
const defaultEventStart = '2022/12/12';
const defaultEventEnd = '2022/12/12';
const defaultEventEndMoreThanStart = '2022/12/20';

const Event = ({}: IReviewProps) => {
  const [eventName, setEventName] = useState<string>(defaultEventName);
  const [description, setDescription] = useState<string>(defaultEventDescription);
  const [age, setAge] = useState<string>(defaultAge);
  const [participants, setParticipants] = useState<number>(defaultParticipants);
  const [totalSpots, setTotalSpots] = useState<number>(defaultSpots);
  const [durationLongerThanDay, setDurationLongerThanDay] = useState<boolean>(false);
  const [eventStart, setEventStart] = useState<string>(defaultEventStart);
  const [evenStartDate, setEventStartDate] = useState<Date>(new Date(eventStart));
  const [eventEnd, setEventEnd] = useState<string>(defaultEventEnd);
  const [eventEndDate, setEventEndDate] = useState<Date>(new Date(eventEnd));
  const [price, setPrice] = useState<string>(defaultPrice);

  useEffect(() => {
    setEventStartDate(new Date(eventStart));
    setEventEndDate(new Date(eventEnd));
  }, [eventStart, eventEnd]);

  useEffect(() => {
    if (evenStartDate) {
      const daysDiff =
        Math.floor((evenStartDate.getTime() - eventEndDate.getTime()) / millisecondsPerDay) + 1;
      if (daysDiff < 0 && !durationLongerThanDay) {
        toast('Длительность больше 1 дня? Поставь галку выше, если да 😇', {
          theme: 'dark',
        });
      }
    }
  }, [evenStartDate, eventEndDate]);

  const handleToggle = () => {
    if (!durationLongerThanDay) {
      setDurationLongerThanDay(true);
      setEventStart(defaultEventEndMoreThanStart);
      setEventEnd(defaultEventEnd);
    }
    if (durationLongerThanDay) {
      setDurationLongerThanDay(false);
      setEventStart(defaultEventStart);
      setEventEnd(defaultEventEnd);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventS = new Date(eventStart);
    const eventE = new Date(eventEnd);

    const data: TFutureEvents = {
      uuid: uuid(),
      eventName,
      description,
      age,
      participants,
      totalSpots,
      eventStart: eventS,
      eventEnd: eventE,
      durationLongerThanDay,
      price,
    };

    const validatedDate = await toast.promise(
      insertFutureEventsSchema.parseAsync(data),
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
        fetch('/api/admin/add/future-event', options),
        {
          pending: 'Добавляем событие...',
          success: 'Успех! Событие добавлено 🥰',
          error: 'Ошибка 🤯',
        },
        {
          autoClose: 5000,
          theme: 'dark',
        },
      )
      .then((res) => res.json());

    if (res.status === 200) {
      setEventName(defaultEventName);
      setDescription(defaultEventDescription);
      setAge(defaultAge);
      setParticipants(defaultParticipants);
      setTotalSpots(defaultSpots);
      setEventStart(defaultEventStart);
      setEventEnd(defaultEventEnd);
      setDurationLongerThanDay(false);
      setPrice(defaultPrice);
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
      label: 'Название события',
      name: 'eventName',
      value: eventName,
      type: 'text',
      placeholder: 'Введи название события',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEventName(e.target.value),
      inputType: 'input',
      className: '',
      required: true,
    },
    {
      id: 2,
      label: 'Возраст деток',
      name: 'age',
      value: age,
      type: 'text',
      placeholder: 'Введи возраст деток',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value),
      inputType: 'input',
      className: '',
      required: true,
    },
    {
      id: 3,
      label: 'Стоимость',
      name: 'price',
      value: price,
      type: 'text',
      placeholder: 'Введи стоимость',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value),
      inputType: 'input',
      className: '',
      required: true,
    },
  ];

  const textarea = {
    id: 2,
    label: 'Описание события',
    name: 'description',
    value: description,
    type: 'text',
    placeholder: 'Введи описание события',
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value),
    inputType: 'textarea',
    className: '',
    required: true,
  };

  const dates = [
    {
      id: 1,
      label: 'Дата начала',
      name: 'eventStart',
      value: eventStart,
      type: durationLongerThanDay ? 'date' : 'datetime-local',
      placeholder: 'Введи дату начала',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEventStart(e.target.value),
      inputType: 'input',
      className: '',
      required: true,
    },
    {
      id: 2,
      label: 'Дата окончания',
      name: 'eventEnd',
      value: eventEnd,
      type: durationLongerThanDay ? 'date' : 'datetime-local',
      placeholder: 'Введи дату окончания',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEventEnd(e.target.value),
      inputType: 'input',
      className: '',
      required: true,
    },
  ];

  const numbers = [
    {
      id: 4,
      label: 'УЖЕ участников',
      name: 'participants',
      value: participants,
      type: 'number',
      placeholder: 'Введи количество',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setParticipants(e.target.valueAsNumber),
      inputType: 'input',
      className: '',
      required: true,
    },
    {
      id: 5,
      label: 'Всего участников',
      name: 'totalSpots',
      value: totalSpots,
      type: 'number',
      placeholder: 'Введи количество',
      onChange: (e: ChangeEvent<HTMLInputElement>) => setTotalSpots(e.target.valueAsNumber),
      inputType: 'input',
      className: '',
      required: true,
    },
  ];

  return (
    <>
      <h1 className='mb-8 text-center text-4xl'>Добавление нового отзыва</h1>
      <div className='flex w-full flex-col flex-nowrap items-center justify-center gap-10 p-2 md:flex-row '>
        <form
          className='z-50 order-2 flex w-full min-w-[300px] max-w-[600px] flex-col items-start justify-start rounded-xl bg-violet-200 p-4'
          onSubmit={handleSubmit}
        >
          <div className='flex w-full flex-row flex-wrap items-center justify-center'>
            {inputsText.map((input, index) => (
              <InputExternalState
                id={input.name}
                key={input.id}
                label={input.label}
                name={input.name}
                value={input.value}
                type={input.type}
                placeholder={input.placeholder}
                onChange={input.onChange}
                className={input.className}
              />
            ))}
          </div>
          <TextAreaExternalState
            id={textarea.name}
            key={textarea.id}
            label={textarea.label}
            name={textarea.name}
            value={textarea.value}
            type={textarea.type}
            placeholder={textarea.placeholder}
            onChange={textarea.onChange}
            className={textarea.className}
          />

          <div className='flex w-full flex-row items-center justify-center gap-4'>
            <label
              htmlFor='durationLongerThanDay'
              className='block text-base font-medium leading-6 text-gray-900 sm:text-lg md:text-xl lg:text-2xl'
            >
              Длительность более 1 дня?
            </label>
            <input
              type='checkbox'
              name='durationLongerThanDay'
              id='durationLongerThanDay'
              className='h-5 w-5 rounded border-2 border-indigo-500 text-indigo-600 focus:ring-indigo-600  lg:h-7 lg:w-7'
              checked={durationLongerThanDay}
              onChange={handleToggle}
            />
          </div>

          <div className='flex w-full flex-row flex-wrap items-center justify-center'>
            {/* TODO: DATES */}
            {dates.map((date, index) => (
              <InputExternalState
                id={date.name}
                key={date.id}
                label={date.label}
                name={date.name}
                value={date.value}
                type={date.type}
                placeholder={date.placeholder}
                onChange={date.onChange}
                className={date.className}
              />
            ))}
          </div>
          <div className='flex w-full flex-row flex-wrap items-center justify-center'>
            {numbers.map((number) => (
              <InputExternalState
                id={number.name}
                key={number.id}
                label={number.label}
                name={number.name}
                value={number.value}
                type={number.type}
                placeholder={number.placeholder}
                onChange={number.onChange}
                className={number.className}
              />
            ))}
          </div>

          <div className='flex w-full flex-col items-center justify-center'>
            <Button
              variant={'primary'}
              disabled={eventStart === defaultEventStart || eventEnd === defaultEventEnd}
              className='my-6 place-self-center '
            >
              Добавить новый отзыв
            </Button>
          </div>
        </form>
        <div className='flex flex-1 flex-col items-center justify-start '>
          <EventCard
            uuid='1'
            eventName={eventName}
            description={description}
            age={age}
            participants={participants}
            totalSpots={totalSpots}
            eventStart={evenStartDate}
            eventEnd={eventEndDate}
            durationLongerThanDay={durationLongerThanDay}
            price={price}
            disabled
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Event;
