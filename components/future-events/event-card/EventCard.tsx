import { useEffect, useState, useTransition } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hook';
import Button from '@/components/buttons/button';
import { AnimatePresence } from 'framer-motion';
import { toggleHeight } from '@/utils/motion-animations';
import { onOpenModalFormFutureEvents } from '@/services/modalSlice';
import { resetDetails, resetMemberCountChange, setDetails } from '@/services/futureEventSignUpData';
import Image from 'next/image';
import { convertH2M, minutesEachHourInOneDay, TimeDiff } from '@/utils/timeCalcHelpers';
// import { addParticipant } from '@/lib/addParticipant';
// import { publishChange } from '@/lib/publishChange';
import declOfNum from '@/utils/declOfNum';
import workWithDate from '@/utils/workWithDate';
import { TFutureEvents, futureEvents } from '@/db/schemas';
import { m } from 'framer-motion';
import { db } from '@/db/db';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { handleChangeMembers } from '@/app/actions';

const millisecondsPerDay = 1000 * 60 * 60 * 24;
const daysPerMonth = 31;
const minutesEachHour = 60;
const secondsEachMinute = 60;
const addPresentDay = 1;

interface IFutureEventsProps extends TFutureEvents {
  disabled?: boolean;
}

const EventCard = ({
  uuid,
  eventName,
  description,
  age,
  participants,
  totalSpots,
  price,
  durationLongerThanDay,
  eventStart,
  eventEnd,
  disabled
}: IFutureEventsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [enrolled, setEnrolled] = useState<boolean | null>(null);

  const { day, month, monthFull, time: timeStart, dateFull } = workWithDate(eventStart);
  const { day: dayEnd, month: monthEnd, monthFull: monthEndFull, time: timeEnd } = workWithDate(eventEnd);

  // Calculate days difference between ending date and starting date
  const daysDiff = Math.floor((eventEnd.getTime() - eventStart.getTime()) / millisecondsPerDay) + addPresentDay; // +1 for present day so that duration is correct
  const daysWord = declOfNum(daysDiff, ['день', 'дня', 'дней']);
  // is Less than a Month
  const lessThanMonth = daysDiff <= daysPerMonth;
  // is more than a month
  const moreThanMonth = daysDiff > daysPerMonth;

  // Calculate difference between ending time and starting time
  const duration2 = TimeDiff(timeStart, timeEnd);
  // Convert duration to minutes
  const diff = convertH2M(duration2);

  const isFullHour = minutesEachHourInOneDay.some((i) => i === diff);
  const hours = Math.floor(diff / minutesEachHour);
  const minutes = diff % secondsEachMinute;
  const durationName = declOfNum(hours, ['час', 'часа', 'часов']);

  let duration = null;
  if (isFullHour) {
    duration = `${hours} ${durationName}`;
  } else if (hours === 0) {
    duration = `${minutes} минут`;
  } else if (!isFullHour && hours > 0) {
    duration = `${hours} ${durationName} ${minutes} минут`;
  }

  // Spots Left
  const spotsLeft = totalSpots - participants;
  // Spots Word
  const spotsWord = declOfNum(spotsLeft, ['место', 'места', 'мест']);

  const handleClick1 = (uuid: string, eventName: string, dateFull: string, participants: number) => {
    router.push(`/form/future-events?uuid=${uuid}`);
    // startTransition(() => handleChangeMembers(uuid, eventName, dateFull, participants));
    // setEnrolled(true);
  };

  return (
    <div className='relative flex w-[300px] flex-col items-center justify-center gap-8 rounded-[3rem] border border-slate-900 bg-slate-50 px-4 py-4 shadow-2xl dark:border-primary-200 dark:bg-slate-950 sm:w-[340px] md:w-[370px] lg:w-[400px] lg:px-6 lg:py-4 xl:w-[450px]'>
      <div className=' absolute -top-[3rem] left-[2.5rem] flex h-[6rem] w-[6rem] flex-col items-center justify-center rounded-full bg-accent-800 dark:bg-accent-800 sm:-top-[3.5rem] sm:left-[3rem] sm:h-[6.7rem] sm:w-[6.7rem] md:-top-[3.5rem] md:left-[3.5rem] lg:h-[7.3rem] lg:w-[7.3rem] xl:h-[8rem] xl:w-[8rem]'>
        {lessThanMonth && durationLongerThanDay ? (
          <span className='whitespace-nowrap text-3xl sm:text-4xl'>
            {day}-{dayEnd}
          </span>
        ) : (
          <span className='whitespace-nowrap text-3xl sm:text-4xl md:text-5xl'>{day}</span>
        )}
      </div>
      <div className='ml-16 flex flex-col items-start justify-center tracking-widest text-accent-800 md:ml-20'>
        <span className='text-2xl md:text-3xl'>{month}</span>
        {!durationLongerThanDay && <span className='text-2xl md:text-3xl'>{timeStart}</span>}
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h2 className='text-center text-3xl leading-tight md:text-4xl'>{eventName}</h2>
          {open ? null : <p className='md:text-xl'>{age}</p>}
        </div>
        <AnimatePresence initial={false} mode={'wait'}>
          {open ? (
            <m.div
              className='flex flex-col items-center justify-start gap-8'
              variants={toggleHeight}
              initial={toggleHeight.hidden}
              animate={toggleHeight.visible}
              exit={toggleHeight.exit}
            >
              <p>{description}</p>
              <div className='flex w-full flex-col items-start justify-center'>
                <p> Возраст - {age}</p>
                {durationLongerThanDay && lessThanMonth ? (
                  <p>
                    Длительность - {daysDiff} {daysWord}
                  </p>
                ) : moreThanMonth ? (
                  <p>
                    {' '}
                    Длительность - c {monthFull} по {monthEndFull}
                  </p>
                ) : (
                  <p> Длительность - {duration}</p>
                )}
                <p> Количество мест - {totalSpots}</p>
                <p>
                  Стоимость - <span>{price}</span>
                </p>
              </div>
              <div className='flex w-full flex-row items-center justify-between gap-8 lg:gap-12'>
                <p>
                  Еще свободно {spotsLeft} {spotsWord}
                </p>
                <Button
                  type='button'
                  variant={'secondaryGhost'}
                  onClick={() => handleClick1(uuid, eventName, dateFull, participants)}
                  disabled={enrolled || spotsLeft === 0 || disabled}
                >
                  {enrolled
                    ? 'Ждем вас!'
                    : spotsLeft === 0
                    ? 'Мест больше нет'
                    : isPending
                    ? 'loading...'
                    : 'Приведу ребенка'}
                </Button>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
      <m.div
        className='flex w-[70%] items-start justify-center bg-gray-200 py-4 dark:bg-gray-900'
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={'/downArrow.svg'}
          width={30}
          height={20}
          alt=''
          style={{
            transform: open ? 'rotate(540deg)' : 'rotate(0deg)',
            transition: 'transform 0.5s ease-in-out',
          }}
        />
      </m.div>
    </div>
  );
};

export default EventCard;
