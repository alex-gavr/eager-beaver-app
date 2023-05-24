const workWithDate = (date: Date) => {
  const time = new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  const day = new Date(date).toLocaleString('ru-RU', { day: 'numeric' });
  // writes just month -- june
  const month = new Date(date)
    .toLocaleString('ru-RU', {
      month: 'long',
      day: 'numeric',
    })
    .split(' ')[1];

  const monthFull = new Date(date).toLocaleString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });

  const dateFull = new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    time,
    day,
    month,
    monthFull,
    dateFull,
  };
};

export default workWithDate;
