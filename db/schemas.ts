import { InferModel } from 'drizzle-orm';
import {
  bigint,
  boolean,
  datetime,
  mysqlEnum,
  mysqlTable,
  text,
  tinyint,
  varchar,
} from 'drizzle-orm/mysql-core';

export const thematicEvents = mysqlTable('thematic_events', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  heading: varchar('heading', { length: 100 }).notNull(),
  paragraph: varchar('paragraph', { length: 100 }).notNull(),
  images: text('images').notNull(),
  imageSide: mysqlEnum('image_side', ['left', 'right']).notNull(),
});

export type TThematicEvents = InferModel<typeof thematicEvents>;

interface Images {
  image: string;
}
export interface IEventsData {
  id: number;
  images: Images[];
  imageSide: 'left' | 'right';
  heading: string;
  paragraph: string;
}

export const futureEvents = mysqlTable('future_events', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
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

export const faq = mysqlTable('faq', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  question: varchar('question', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }).notNull(),
});

export type TFaq = InferModel<typeof faq>;

export const prices = mysqlTable('prices', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  priceName: varchar('price_name', { length: 50 }).notNull(),
  price: varchar('price', { length: 50 }).notNull(),
  cardColor: mysqlEnum('card_color', ['green', 'yellow']).notNull(),
  feature1: varchar('feature1', { length: 100 }),
  feature2: varchar('feature2', { length: 100 }),
  feature3: varchar('feature3', { length: 100 }),
});

export type TPrices = InferModel<typeof prices>;

export const reviews = mysqlTable('reviews', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  childName: varchar('child_name', { length: 100 }).notNull(),
  parentName: varchar('parent_name', { length: 100 }).notNull(),
  relationToChild: varchar('relation_to_child', { length: 100 }).notNull(),
  review: varchar('review', { length: 1000 }).notNull(),
  image: varchar('image', { length: 150 }).notNull(),
});

export type TReviews = InferModel<typeof reviews>;

export const teachers = mysqlTable('teachers', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  image: varchar('image', { length: 150 }).notNull(),
});

export type TTeachers = InferModel<typeof teachers>;