import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hook';
import Button from '@/components/buttons/button';
import { AnimatePresence } from 'framer-motion';
import { toggleHeight } from '@/utils/motion-animations';
import { onOpenModalFormFutureEvents } from '@/services/modalSlice';
import { resetDetails, resetMemberCountChange, setDetails } from '@/services/futureEventSignUpData';
import Image from 'next/image';
import {
  InnerContainer,
  InnerContainerDetails,
  MonthAndTimeContainer,
  SpaceBetween,
  StyledCard,
  StyledDateNumber,
  TitleAndAgeContainer,
  TogglerContainer,
} from './EventCardsStyles';
import { convertH2M, minutesEachHourInOneDay, TimeDiff } from '@/utils/timeCalcHelpers';
import { addParticipant } from '@/lib/addParticipant';
import { publishChange } from '@/lib/publishChange';
import declOfNum from '@/utils/declOfNum';
import workWithDate from '@/utils/workWithDate';
import { FlexCCC } from '@/styles/StyledMain';

interface IProps {
  title: string;
  description: string;
  age: string;
  participants: number;
  total_spots: number;
  price: string;
  durationLongerThanDay: boolean;
  start: string;
  end: string;
  entryId: string;
}

const EventCard = ({
  title,
  description,
  age,
  participants: participantsData,
  total_spots,
  price,
  durationLongerThanDay,
  start,
  end,
  entryId,
}: IProps) => {
  const [participants, setParticipants] = useState<number>(participantsData);
  const { shouldChangeMember, futureEventDetails } = useAppSelector((state) => state.futureEventDetails);
  const [enrolled, setEnrolled] = useState(false);
  const [interested, setInterested] = useState(false);
  const dispatch = useAppDispatch();

  const { day, month, monthFull, time: timeStart, dateFull } = workWithDate(start);
  const { day: dayEnd, month: monthEnd, monthFull: monthEndFull, time: timeEnd } = workWithDate(end);

  // Calculate days difference between ending date and starting date
  const daysDiff = Math.floor((Date.parse(end) - Date.parse(start)) / 86400000) + 1;
  const daysWord = declOfNum(daysDiff, ['день', 'дня', 'дней']);
  // is Less than a Month
  const lessThanMonth = daysDiff <= 31;
  // is more than a month
  const moreThanMonth = daysDiff > 31;

  // Calculate difference between ending time and starting time
  const duration2 = TimeDiff(timeStart, timeEnd);
  // Convert duration to minutes
  const diff = convertH2M(duration2);

  const isFullHour = minutesEachHourInOneDay.some((i) => i === diff);
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
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
  const spotsLeft = total_spots - participants;
  // Spots Word
  const spotsWord = declOfNum(spotsLeft, ['место', 'места', 'мест']);

  const [open, setOpen] = useState(false);

  // OPENS FORM AND PREPARES DATA
  const handleClick = async (
    title: string,
    age: string,
    dateFull: string,
    participants: number,
    entryId: string,
  ) => {
    const values = {
      title,
      age,
      dateFull,
      participants,
      entryId,
    };

    dispatch(onOpenModalFormFutureEvents());
    dispatch(setDetails(values));
    setInterested(true);
  };

  // PUSH NEW MEMBER TO CONTENTFUL AND GET UPDATED NUMBER
  const handleParticipantsChange = async () => {
    const participantsFromRedux = futureEventDetails?.participants;
    const entryId = futureEventDetails?.entryId;
    if (entryId === undefined || participantsFromRedux === undefined) {
      return null;
    }

    const members = participantsFromRedux + 1;

    const result = await addParticipant(entryId, members).then((response) => publishChange(response.sys.id));

    setParticipants(result.fields.participants['en-US']);
    dispatch(resetMemberCountChange());
  };

  // INIT PARTICIPANTS CHANGE IF USER FILLED FORM. INTERESTED IS USED TO IDENTIFY EXACT CARD THAT WAS CHOSEN.
  useEffect(() => {
    if (shouldChangeMember && interested) {
      handleParticipantsChange();
      dispatch(resetDetails());
      setEnrolled(true);
      setInterested(false);
    }
  }, [shouldChangeMember, interested]);

  return (
    <StyledCard>
      <StyledDateNumber>
        {lessThanMonth && durationLongerThanDay ? (
          <span
            style={{
              whiteSpace: 'nowrap',
              fontSize: 'clamp(1.75rem, 1.6rem + 0.75vw, 2.5rem)',
            }}
          >
            {day}-{dayEnd}
          </span>
        ) : (
          <span>{day}</span>
        )}
      </StyledDateNumber>
      <MonthAndTimeContainer>
        <span>{month}</span>
        {!durationLongerThanDay && <span>{timeStart}</span>}
      </MonthAndTimeContainer>
      <FlexCCC>
        <TitleAndAgeContainer>
          <h2>{title}</h2>
          {open ? null : <p>{age}</p>}
        </TitleAndAgeContainer>
        <AnimatePresence initial={false} mode={'wait'}>
          {open ? (
            <InnerContainer
              variants={toggleHeight}
              initial={toggleHeight.hidden}
              animate={toggleHeight.visible}
              exit={toggleHeight.exit}
            >
              <p>{description}</p>
              <InnerContainerDetails>
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
                <p> Количество мест - {total_spots}</p>
                <p>
                  Стоимость - <span>{price}</span>
                </p>
              </InnerContainerDetails>
              <SpaceBetween>
                <p>
                  Еще свободно {spotsLeft} {spotsWord}
                </p>
                <Button
                  type='emptyPrimary'
                  typeHTML='submit'
                  padding='0.5rem 0.9rem'
                  fontFamily='var(--ff-body)'
                  onClick={() => handleClick(title, age, dateFull, participants, entryId)}
                  disabled={enrolled || spotsLeft === 0}
                >
                  {enrolled ? 'Ждем вас!' : spotsLeft === 0 ? 'Мест больше нет' : 'Приведу ребенка'}
                </Button>
              </SpaceBetween>
            </InnerContainer>
          ) : null}
        </AnimatePresence>
      </FlexCCC>
      <TogglerContainer onClick={() => setOpen((prev) => !prev)}>
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
      </TogglerContainer>
    </StyledCard>
  );
};

export default EventCard;
