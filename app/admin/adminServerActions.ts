'use server';

import { db } from '@/db/db';
import {
  faq,
  futureEvents,
  insertFaqSchema,
  insertFutureEventsSchema,
  insertPriceSchema,
  insertReviewSchema,
  insertTeacherSchema,
  insertThematicEventsSchema,
  prices,
  reviews,
  teachers,
  thematicEvents,
} from '@/db/schemas';
import { eq } from 'drizzle-orm';

export async function addFaq(data: any) {
  const validFaq = await insertFaqSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db.insert(faq).values(validFaq);

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function updateFaq(data: any) {
  const validFaq = await insertFaqSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db
    .update(faq)
    .set({ question: validFaq.question, description: validFaq.description })
    .where(eq(faq.uuid, validFaq.uuid));

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function addTeacher(data: any) {
  const validTeacher = await insertTeacherSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db.insert(teachers).values(validTeacher);

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function updateTeacher(data: any) {
  const validTeacher = await insertTeacherSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });
  const res = await db
    .update(teachers)
    .set({
      fullName: validTeacher.fullName,
      description: validTeacher.description,
      image: validTeacher.image,
    })
    .where(eq(teachers.uuid, validTeacher.uuid));

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function addReview(data: any) {
  const validReview = await insertReviewSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db.insert(reviews).values(validReview);

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function updateReview(data: any) {
  const validThematicEvent = await insertReviewSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db
    .update(reviews)
    .set({
      childName: validThematicEvent.childName,
      parentName: validThematicEvent.parentName,
      relationToChild: validThematicEvent.relationToChild,
      review: validThematicEvent.review,
      image: validThematicEvent.image,
    })
    .where(eq(reviews.uuid, validThematicEvent.uuid));

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function addFutureEvent(data: any) {
  const validFutureEvent = await insertFutureEventsSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db.insert(futureEvents).values(validFutureEvent);

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function updateFutureEvent(data: any) {
  const validThematicEvent = await insertFutureEventsSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db
    .update(futureEvents)
    .set({
      eventName: validThematicEvent.eventName,
      description: validThematicEvent.description,
      age: validThematicEvent.age,
      durationLongerThanDay: validThematicEvent.durationLongerThanDay,
      eventStart: validThematicEvent.eventStart,
      eventEnd: validThematicEvent.eventEnd,
      price: validThematicEvent.price,
      participants: validThematicEvent.participants,
      totalSpots: validThematicEvent.totalSpots,
    })
    .where(eq(futureEvents.uuid, validThematicEvent.uuid));

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function addPrice(data: any) {
  const validPrice = await insertPriceSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db.insert(prices).values(validPrice);

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function updatePrice(data: any) {
  const validThematicEvent = await insertPriceSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db
    .update(prices)
    .set({
      price: validThematicEvent.price,
      priceName: validThematicEvent.priceName,
      cardColor: validThematicEvent.cardColor,
      feature1: validThematicEvent.feature1,
      feature2: validThematicEvent.feature2,
      feature3: validThematicEvent.feature3,
    })
    .where(eq(prices.uuid, validThematicEvent.uuid));

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function addThematicEvent(data: any) {
  const validThematicEvent = await insertThematicEventsSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db.insert(thematicEvents).values(validThematicEvent);

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}

export async function updateThematicEvent(data: any) {
  const validThematicEvent = await insertThematicEventsSchema.parseAsync(data).catch((err) => {
    throw new Error(err);
  });

  const res = await db
    .update(thematicEvents)
    .set({
      heading: validThematicEvent.heading,
      paragraph: validThematicEvent.paragraph,
      imageSide: validThematicEvent.imageSide,
      images: validThematicEvent.images,
    })
    .where(eq(thematicEvents.uuid, validThematicEvent.uuid));

  if (res.rowsAffected === 1) {
    return 200;
  } else {
    return 500;
  }
}
