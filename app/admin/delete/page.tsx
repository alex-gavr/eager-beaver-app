import StyledLink from '@/components/StyledLink/StyledLink';

interface IPageProps {}

const Page = ({}: IPageProps) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <h1 className='text-3xl lg:text-5xl'>Что именно хочешь удалить?</h1>
      <div className='flex max-w-xl flex-row flex-wrap items-center justify-center gap-4'>
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

const possibilities = [
  {
    id: 1,
    name: 'Учителя',
    path: '/admin/delete/teachers',
  },
  {
    id: 2,
    name: 'Отзыв',
    path: '/admin/delete/reviews',
  },
  {
    id: 3,
    name: 'Мероприятие',
    path: '/admin/delete/thematicEvents',
  },
  {
    id: 4,
    name: 'Тариф',
    path: '/admin/delete/prices',
  },
  {
    id: 5,
    name: 'Вопрос / Ответ',
    path: '/admin/delete/faq',
  },
  {
    id: 6,
    name: 'Тематическое мероприятие',
    path: '/admin/delete/futureEvents',
  },
];
