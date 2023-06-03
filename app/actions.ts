'use server';

import { db } from '@/db/db';
import { futureEvents, insertUserSchema, users } from '@/db/schemas';
import { userEventSignUpMessage, userSignUpMessage } from '@/utils/formTelMessage';
import getIsTestVariable from '@/utils/getIsTestVariable';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { ZodError } from 'zod';

const botId = process.env.TELEGRAM_BOT_TOKEN;
const chatIDLera = process.env.TELEGRAM_LERA_ID;
const chatIDGavr = process.env.TELEGRAM_GAVR_ID;

export async function handleSubmitBaseForm(name: string, phone: string) {
  const userFromBody = {
    uuid: uuid(),
    personName: name,
    phone: phone,
  };

  const userData = await insertUserSchema.parseAsync(userFromBody).catch((e: ZodError) => {
    throw new Error(e.message);
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

    if (status === 200) {
      return 200;
    } else {
      return 500;
    }
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

    if (status === 200) {
      return 200;
    } else {
      return 500;
    }
  }
}

export async function handleSubmitEvent(name: string, phone: string, eventId: string) {
  const fullEventData = await db.select().from(futureEvents).where(eq(futureEvents.uuid, eventId));

  if (fullEventData.length === 0) {
    return null;
  }
  const userFromBody = {
    uuid: uuid(),
    personName: name,
    phone: phone,
  };

  const userData = await insertUserSchema.parseAsync(userFromBody).catch((e) => {
    throw new Error(e.message);
  });

  const message = userEventSignUpMessage(
    userData.personName,
    userData.phone,
    fullEventData[0].eventName,
    fullEventData[0].eventStart.toLocaleDateString(),
  );
  const isTest = getIsTestVariable(userData.personName, userData.phone);

  if (isTest) {
    const url = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    const telegramGavr = fetch(url);
    const addUserToDb = db.insert(users).values(userData);
    const decreaseSpotsAvailable = db
      .update(futureEvents)
      .set({ participants: fullEventData[0].participants + 1 })
      .where(eq(futureEvents.uuid, eventId));

    const [telegramResult, dbResult, spotDecreaseResult] = await Promise.all([
      telegramGavr,
      addUserToDb,
      decreaseSpotsAvailable,
    ]);
    const status = telegramResult.status;
    const dbStatus = dbResult.rowsAffected;
    const spotDecreaseStatus = spotDecreaseResult.rowsAffected;

    if (status === 200) {
      return 200;
    } else {
      return 500;
    }
  }

  if (!isTest) {
    const urlGavr = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    const urlLera = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatIDLera}&text=${message}`;

    const telegramGavr = fetch(urlGavr);
    const telegramLera = fetch(urlLera);
    const addUserToDb = db.insert(users).values(userData);
    const decreaseSpotsAvailable = db
      .update(futureEvents)
      .set({ participants: fullEventData[0].participants + 1 })
      .where(eq(futureEvents.uuid, eventId));

    const [telegramResultGavr, telegramResultLera, dbResult, spotDecreaseResult] = await Promise.all([
      telegramGavr,
      telegramLera,
      addUserToDb,
      decreaseSpotsAvailable,
    ]);

    const status = telegramResultLera.status;
    const dbStatus = dbResult.rowsAffected;
    const spotDecreaseStatus = spotDecreaseResult.rowsAffected;

    if (status === 200) {
      return 200;
    } else {
      return 500;
    }
  }
}
