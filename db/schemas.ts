import { InferModel } from 'drizzle-orm';
import {
  bigint,
  boolean,
  datetime,
  mediumint,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  tinyint,
  varchar,
} from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const thematicEvents = mysqlTable('thematic_events', {
  // id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).notNull(),
  heading: varchar('heading', { length: 100 }).notNull(),
  paragraph: varchar('paragraph', { length: 100 }).notNull(),
  images: text('images').notNull(),
  imageSide: mysqlEnum('image_side', ['left', 'right']).notNull(),
});

export type TThematicEvents = InferModel<typeof thematicEvents>;

export const insertThematicEventsSchema = createInsertSchema(thematicEvents, {
  heading: z.string().max(100),
  paragraph: z.string().max(100),
})

export interface Images {
  image: string;
}
export interface IEventsData {
  uuid: string;
  images: Images[];
  imageSide: 'left' | 'right';
  heading: string;
  paragraph: string;
}

export const futureEvents = mysqlTable('future_events', {
  // id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).notNull(),
  eventName: varchar('event_name', { length: 50 }).notNull(),
  description: varchar('description', { length: 500 }).notNull(),
  age: varchar('age', { length: 50 }).notNull(),
  durationLongerThanDay: boolean('duration_longer_than_day').notNull(),
  eventStart: datetime('event_start').notNull(),
  eventEnd: datetime('event_end').notNull(),
  participants: tinyint('participants').notNull(),
  totalSpots: tinyint('total_spots').notNull(),
  price: varchar('price', { length: 50 }).notNull(),
});

export type TFutureEvents = InferModel<typeof futureEvents>;

export const insertFutureEventsSchema = createInsertSchema(futureEvents, {
  eventName: z.string().max(50),
  description: z.string().max(500),
  age: z.string().max(50),
  price: z.string().max(50),
});

export const faq = mysqlTable('faq', {
  // id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).notNull(),
  question: varchar('question', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }).notNull(),
});

export type TFaq = InferModel<typeof faq>;

export const insertFaqSchema = createInsertSchema(faq, {
  question: z.string().max(255),
  description: z.string().max(1000),
});

export const prices = mysqlTable('prices', {
  // id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).notNull(),
  priceName: varchar('price_name', { length: 50 }).notNull(),
  price: varchar('price', { length: 50 }).notNull(),
  cardColor: mysqlEnum('card_color', ['green', 'yellow']).notNull(),
  feature1: varchar('feature1', { length: 100 }),
  feature2: varchar('feature2', { length: 100 }),
  feature3: varchar('feature3', { length: 100 }),
});

export type TPrices = InferModel<typeof prices>;

export const insertPriceSchema = createInsertSchema(prices, {
  priceName: z.string().max(50),
  price: z.string().max(50),
  feature1: z.string().max(100),
  feature2: z.string().max(100),
  feature3: z.string().max(100),
});

export const reviews = mysqlTable('reviews', {
  // id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).notNull(),
  childName: varchar('child_name', { length: 100 }).notNull(),
  parentName: varchar('parent_name', { length: 100 }).notNull(),
  relationToChild: varchar('relation_to_child', { length: 100 }).notNull(),
  review: varchar('review', { length: 1000 }).notNull(),
  image: varchar('image', { length: 150 }).notNull(),
});

export type TReviews = InferModel<typeof reviews>;

export const insertReviewSchema = createInsertSchema(reviews, {
  childName: z.string().max(100),
  parentName: z.string().max(100),
  relationToChild: z.string().max(100),
  review: z.string().max(1000),
  image: z.string().max(150),
});

export const teachers = mysqlTable('teachers', {
  // id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).notNull(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  image: varchar('image', { length: 150 }).notNull(),
});

export type TTeachers = InferModel<typeof teachers>;

export const insertTeacherSchema = createInsertSchema(teachers, {
  fullName: z.string().max(100),
  description: z.string().max(255),
  image: z.string().max(150),
});

export const users = mysqlTable('eager_beaver_users', {
  // id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 36 }).notNull(),
  personName: varchar('person_name', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().default('we@donno.ru'),
  phone: varchar('phone', { length: 30 }).notNull(),
  beaverCoins: mediumint('beaver_coins').notNull().default(500),
  submitTime: timestamp('submit_time').notNull().defaultNow(),
});

export type TUsers = InferModel<typeof users>;

// Schema for inserting a user - can be used to validate API requests
// export const insertUserSchema = createInsertSchema(users);

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);

export const insertUserSchema = createInsertSchema(users, {
  phone: z.string().startsWith('(9'),
});
