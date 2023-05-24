export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';

interface IBodyData {
  name: string;
  tel: string;
  event: string;
  age: string;
  date: string;
}

const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const chatIDLera = process.env.NEXT_PUBLIC_TELEGRAM_LERA_ID;
const chatIDGavr = process.env.NEXT_PUBLIC_TELEGRAM_GAVR_ID;

export async function POST(request: NextRequest, response: NextResponse) {
  const { headers } = request;
  const auth = headers.get('Authorization');

  if (auth !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    return NextResponse.json({ response: 'Unauthorized, fuck off', status: 401 });
  }

  const body = await request.json();
  console.log(body);
  const { name, tel, event, age, date }: IBodyData = body;

  const testVariables =
    tel === '(999) 999-99-99' || name === 'test' || name === 'тест' || name === 'Test' || name === 'Тест';

  // Telegram Form Submit
  const messageFormCompleted = `
  Лера, привет 👋%0A
Новый человек заполнил форму 😯%0A
Имя: ${name}%0A
Номер Телефона: 8${tel}%0A
Свяжемся с ними? 😌
`;

  //  TELEGRAM FUTURE EVENT
  const messageForFutureEvent = `
    Лера, привет 🤍%0A
  ${name} хочет привести ребенка на ${event} 🎉%0A
  Который проходит: ${date}%0A
  Там где возраст деток: ${age}%0A
  Телефон для связи с ними: 8${tel}%0A
  Напиши им 😉
  `;

  const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDLera}&text=${
    event ? messageForFutureEvent : messageFormCompleted
  }`;
  const url2 = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${
    event ? messageForFutureEvent : messageFormCompleted
  }`;

  if (event) {
    try {
      if (testVariables) {
        const telegramAlertSubmitGavr = await fetch(url2);
        const status = telegramAlertSubmitGavr.status;
        return NextResponse.json({ status });
      } else {
        const telegramAlertSubmit = await fetch(url);
        const telegramAlertSubmitGavr = await fetch(url2);
        const status = telegramAlertSubmit.status;
        return NextResponse.json({ status });
      }
    } catch {
      //   res.status(500).send({ status: 500, error: 'fatal' });
      return NextResponse.json({ status: 500, error: 'fatal' });
    }
  } else {
    try {
      if (testVariables) {
        const telegramAlertSubmitGavr = await fetch(url2);
        const status = telegramAlertSubmitGavr.status;
        // const result = await addUserData(name, tel).then((result) => publishChange(result.sys.id));
        // TODO: FIX THIS
        const result = 200
        const status2 = result !== undefined ? 200 : 500;
        return NextResponse.json({ status, status2 });
        // res.status(200).send({ status, status2 });
      } else {
        // Lera
        const telegramAlertSubmit = await fetch(url);
        const status = telegramAlertSubmit.status;
        // Gavr
        const telegramAlertSubmitGavr = await fetch(url2);
        // const statusGavr = telegramAlertSubmitGavr.status;

        // Submit new User to Contentful
        // const result = await addUserData(name, tel).then((result) => publishChange(result.sys.id));

        // TODO: FIX THIS
        const result = 200
        const status2 = result !== undefined ? 200 : 500;

        // res.status(200).send({ status, status2 });
        return NextResponse.json({ status, status2 });
      }
    } catch (error) {
      //   res.status(500).send({ status: 500, error: 'fatal' });
      return NextResponse.json({ status: 500, error: error });
    }
  }

  //   return NextResponse.json({ response: res, status: 200 });
}
