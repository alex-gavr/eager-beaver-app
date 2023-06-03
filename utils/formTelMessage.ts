export const userSignUpMessage = (user: string, phone: string) => {
  const messageFormCompleted = `
Лера, привет 👋%0A
Новый человек заполнил форму 😯%0A
Имя: ${user}%0A
Номер Телефона: 8${phone}%0A
Свяжемся с ними? 😌
`;
  return messageFormCompleted;
};

export const userEventSignUpMessage = (user: string, phone: string, event: string, dateFull: string) => {
  const messageForFutureEvent = `
  Лера, привет 🤍%0A
${user} хочет привести ребенка на ${event} 🎉%0A
Который проходит: ${dateFull}%0A
Телефон для связи с ними: 8${phone}%0A
Напиши им 😉
`;
return messageForFutureEvent;
};
