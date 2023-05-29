'use server';

import { db } from '@/db/db';
import { futureEvents, insertUserSchema, users } from '@/db/schemas';
import { userSignUpMessage, userEventSignUpMessage } from '@/utils/formTelMessage';
import getIsTestVariable from '@/utils/getIsTestVariable';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/dist/client/components/headers';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { ZodError } from 'zod';

const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const chatIDLera = process.env.NEXT_PUBLIC_TELEGRAM_LERA_ID;
const chatIDGavr = process.env.NEXT_PUBLIC_TELEGRAM_GAVR_ID;

export async function handleSubmit(formData: FormData) {
  const name = formData.get('name');
  const phone = formData.get('phone');

  if (name === null || phone === null) {
    return;
  }

  const userFromBody = {
    uuid: uuid(),
    personName: name,
    phone: phone,
  };

  const userData = await insertUserSchema.parseAsync(userFromBody).catch((e: ZodError) => {
    throw new Error(e.message);
  });

  cookies().set({
    name: 'name',
    value: userData.personName,
    // @ts-ignore
    maxAge: 31536000, // 60 * 60 * 24 * 365
    path: '/',
    secure: true,
    sameSite: 'lax',
  });

  const message = userSignUpMessage(userData.personName, userData.phone);
  const isTest = getIsTestVariable(userData.personName, userData.phone);

  if (isTest) {
    const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    const telegramGavr = fetch(url);
    const addUserToDb = db.insert(users).values(userData);
    const [telegramResult, dbResult] = await Promise.all([telegramGavr, addUserToDb]);
    const status = telegramResult.status;
    const dbStatus = dbResult.rowsAffected;
    console.log(status, dbStatus);

    if (status === 200) {
      redirect('/form-success', RedirectType.replace);
    } else {
      redirect('/form-error', RedirectType.replace);
    }

    // return status;
  }

  if (!isTest) {
    const urlLera = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDLera}&text=${message}`;
    const urlGavr = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    const telegramLera = fetch(urlLera);
    const telegramGavr = fetch(urlGavr);
    const addUserToDb = db.insert(users).values(userData);
    const [leraResult, gavrResult, dbResult] = await Promise.all([telegramLera, telegramGavr, addUserToDb]);
    const status = leraResult.status;
    const dbStatus = dbResult.rowsAffected;
    console.log(status, dbStatus);
    return status;
  }
}

export async function handleSubmitEvent(formData: FormData, searchParams: URLSearchParams) {
  const name = formData.get('name');
  const phone = formData.get('phone');

  if (name === null || phone === null) {
    return;
  }

  const userFromBody = {
    uuid: uuid(),
    personName: name,
    phone: phone,
  };

  const userData = await insertUserSchema.parseAsync(userFromBody).catch((e: ZodError) => {
    throw new Error(e.message);
  });

  const event = cookies().get('event')?.value ?? 'error';
  const eventId = cookies().get('eventId')?.value ?? 'errorId';

  cookies().set({
    name: 'name',
    value: userData.personName,
    // @ts-ignore
    maxAge: 31536000, // 60 * 60 * 24 * 365
    path: '/',
    secure: true,
    sameSite: 'lax',
  });

  const message = userEventSignUpMessage(userData.personName, userData.phone, event, 'what');
  const isTest = getIsTestVariable(userData.personName, userData.phone);

  if (isTest) {
    const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    const getCurrentParticipants = await db
      .select({ participants: futureEvents.participants })
      .from(futureEvents)
      .where(eq(futureEvents.uuid, eventId));

    const newParticipants = getCurrentParticipants[0].participants + 1;

    const telegramGavr = fetch(url);
    const decreaseSpotsAvailable = db
      .update(futureEvents)
      .set({ participants: newParticipants })
      .where(eq(futureEvents.uuid, eventId));
    // const addUserToDb = db.insert(users).values(userData);
    const [telegramResult, dbResult] = await Promise.all([telegramGavr, decreaseSpotsAvailable]);
    const status = telegramResult.status;
    const dbStatus = dbResult.rowsAffected;
    console.log(status, dbStatus);

    revalidatePath('/schedule');
  }
}

export async function handleChangeMembers(
  uuid: string,
  eventName: string,
  dateFull: string,
  participants: number,
) {
  // const userData = await insertUserSchema.parseAsync(userFromBody).catch((e: ZodError) => {
  //   throw new Error(e.message);
  // });

  const message = userEventSignUpMessage('test', 'test', eventName, dateFull);
  const isTest = getIsTestVariable('test', '(909) 378-66-78');

  if (isTest) {
    const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    // const getCurrentParticipants = await db
    //   .select({ participants: futureEvents.participants })
    //   .from(futureEvents)
    //   .where(eq(futureEvents.uuid, eventId));

    // const newParticipants = getCurrentParticipants[0].participants + 1;

    const telegramGavr = fetch(url);
    const decreaseSpotsAvailable = db
      .update(futureEvents)
      .set({ participants: participants + 1 })
      .where(eq(futureEvents.uuid, uuid));
    // const addUserToDb = db.insert(users).values(userData);
    const [telegramResult, dbResult] = await Promise.all([telegramGavr, decreaseSpotsAvailable]);
    const status = telegramResult.status;
    const dbStatus = dbResult.rowsAffected;
    // console.log(status, dbStatus);
    revalidatePath('/schedule');
  }
}

// catch (error) {
//   if (error instanceof ZodError) {
//     console.log(error.message);
//     return error.message;
//   }
