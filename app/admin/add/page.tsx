import StyledLink from '@/components/StyledLink/StyledLink';

interface IPageProps {}

const Page = ({}: IPageProps) => {
  const possibilities = [
    {
      id: 1,
      name: 'Учителя',
      path: '/admin/add/teachers',
    },
    {
      id: 2,
      name: 'Отзыв',
      path: '/admin/add/review',
    },
    {
      id: 3,
      name: 'Мероприятие',
      path: '/admin/add/event',
    },
    {
      id: 4,
      name: 'Тариф',
      path: '/admin/add/pricing',
    },
    {
      id: 5,
      name: 'Вопрос / Ответ',
      path: '/admin/add/faq',
    },
    {
      id: 6,
      name: 'Тематическое мероприятие',
      path: '/admin/add/thematic-event',
    }
  ];
  return (
    <div className='flex min-h-[90vh] flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl md:text-3xl lg:text-5xl mb-8 text-center'>Что именно?</h1>
      <div className='flex flex-row flex-wrap items-center justify-center gap-4 max-w-xl'>
        {possibilities.map((item) => (
          <StyledLink key={item.id} href={item.path}>
            {item.name}
          </StyledLink>
        ))}
      </div>
    </div>
  );
};

export default Page;
