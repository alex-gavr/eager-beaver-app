import {
  AcademicCapIcon,
  BanknotesIcon,
  ChatBubbleBottomCenterTextIcon,
  PresentationChartBarIcon,
  QuestionMarkCircleIcon,
  SunIcon,
} from '@heroicons/react/24/outline';


export const getPossibilities = (route: 'add' | 'edit' | 'delete') => {
  return [
    {
      id: 1,
      name: 'Учителя',
      icon: <AcademicCapIcon className='h-10 w-10 text-primary-800' />,
      path: `/admin/${route}/teachers`,
    },
    {
      id: 2,
      name: 'Отзыв',
      icon: <ChatBubbleBottomCenterTextIcon className='h-10 w-10 text-primary-800' />,
      path: `/admin/${route}/reviews`,
    },
    {
      id: 3,
      name: 'Будущее Мероприятие',
      icon: <PresentationChartBarIcon className='h-10 w-10 text-primary-800' />,
      path: `/admin/${route}/futureEvents`,
    },
    {
      id: 4,
      name: 'Тариф',
      icon: <BanknotesIcon className='h-10 w-10 text-primary-800' />,
      path: `/admin/${route}/prices`,
    },
    {
      id: 5,
      name: 'FAQ',
      icon: <QuestionMarkCircleIcon className='h-10 w-10 text-primary-800' />,
      path: `/admin/${route}/faq`,
    },
    {
      id: 6,
      name: 'Тематическое мероприятие',
      icon: <SunIcon className='h-10 w-10 text-primary-800' />,
      path: `/admin/${route}/thematicEvents`,
    },
  ];
};
