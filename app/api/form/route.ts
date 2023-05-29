export const runtime = 'edge';
import { db } from '@/db/db';
import { insertUserSchema, users } from '@/db/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

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

  if (!body) {
    return NextResponse.json({ response: 'No body', status: 400 });
  }

  const { name, tel, event, age, date }: IBodyData = body;

  console.log(event);

  const userFromBody = {
    uuid: uuid(),
    personName: name,
    phone: tel,
  };

  const userData = insertUserSchema.parse(userFromBody);

  const testVariables =
    userData.phone === '(999) 999-99-99' ||
    userData.phone === 'test' ||
    userData.phone === 'тест' ||
    userData.phone === 'Test' ||
    userData.phone === 'Тест';

  // Telegram Form Submit
  const messageFormCompleted = `
  Лера, привет 👋%0A
Новый человек заполнил форму 😯%0A
Имя: ${userData.personName}%0A
Номер Телефона: 8${userData.phone}%0A
Свяжемся с ними? 😌
`;

  //  TELEGRAM FUTURE EVENT
  const messageForFutureEvent = `
  Лера, привет 🤍%0A
${userData.personName} хочет привести ребенка на ${event} 🎉%0A
Который проходит: ${date}%0A
Там где возраст деток: ${age}%0A
Телефон для связи с ними: 8${userData.phone}%0A
Напиши им 😉
`;

  const leraUrl = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDLera}&text=${
    event ? messageForFutureEvent : messageFormCompleted
  }`;
  const gavrUrl = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${
    event ? messageForFutureEvent : messageFormCompleted
  }`;

  if (event) {
    try {
      if (testVariables) {

        const telegramGavr = fetch(gavrUrl);
        const addUserToDb = db.insert(users).values(userData);
        const [telegramResult, dbResult] = await Promise.all([telegramGavr, addUserToDb]);
        const status = telegramResult.status;
        const dbStatus = dbResult.rowsAffected;
        return NextResponse.json({ status, dbStatus });

      } else {

        const telegramLera = fetch(leraUrl);
        const telegramGavr = fetch(gavrUrl);
        const addUserToDb = db.insert(users).values(userData);
        const [telegramResultLera, telegramResultGavr, dbResult] = await Promise.all([
          telegramLera,
          telegramGavr,
          addUserToDb,
        ]);

        const status = telegramResultLera.status;
        return NextResponse.json({ status, dbResult });

      }
    } catch (error) {
      return NextResponse.json({ status: 500, error: error });
    }
  } else {
    try {
      if (testVariables) {

        const telegramGavr = fetch(gavrUrl);
        const addUserToDb = db.insert(users).values(userData);
        const [telegramResult, dbResult] = await Promise.all([telegramGavr, addUserToDb]);
        const status = telegramResult.status;
        const dbStatus = dbResult.rowsAffected;
        return NextResponse.json({ status, dbStatus });

      } else {

        const telegramLera = fetch(leraUrl);
        const telegramGavr = fetch(gavrUrl);
        const addUserToDb = db.insert(users).values(userData);
        const [telegramResultLera, telegramResultGavr, dbResult] = await Promise.all([
          telegramLera,
          telegramGavr,
          addUserToDb,
        ]);

        const status = telegramResultLera.status;
        const dbStatus = dbResult.rowsAffected;
        return NextResponse.json({ status, dbStatus });

      }
    } catch (error) {
      return NextResponse.json({ status: 500, error: error });
    }
  }

  //   return NextResponse.json({ response: res, status: 200 });
}
