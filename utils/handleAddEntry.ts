import { IServerProps } from '@/app/page';
import {
  insertFaqSchema,
  insertFutureEventsSchema,
  insertPriceSchema,
  insertReviewSchema,
  insertTeacherSchema,
  insertThematicEventsSchema,
} from '@/db/schemas';
import { toast } from 'react-toastify';
import { getPromiseTextAdd, toastConfig, toastDataValidationTexts } from './toast/toastConfig';

export type TSlug = IServerProps['params']['slug'];

export const handleAddEntry = async (slug: TSlug, data: any) => {
  if (slug === 'thematicEvents') {
    const validatedDate = await toast.promise(
      insertThematicEventsSchema.parseAsync(data),
      toastDataValidationTexts,
      toastConfig,
    );
    const options = getOption(validatedDate);
    const response = await toast
      .promise(fetch(`/api/admin/add/${slug}`, options), getPromiseTextAdd(slug), toastConfig)
      .then((res) => res.json());
    return response;
  }

  if (slug === 'teachers') {
    const validatedDate = await toast.promise(
      insertTeacherSchema.parseAsync(data),
      toastDataValidationTexts,
      toastConfig,
    );
    const options = getOption(validatedDate);
    const response = await toast
      .promise(fetch(`/api/admin/add/${slug}`, options), getPromiseTextAdd(slug), toastConfig)
      .then((res) => res.json());
    return response;
  }

  if (slug === 'reviews') {
    const validatedDate = await toast.promise(
      insertReviewSchema.parseAsync(data),
      toastDataValidationTexts,
      toastConfig,
    );
    const options = getOption(validatedDate);
    const response = await toast
      .promise(fetch(`/api/admin/add/${slug}`, options), getPromiseTextAdd(slug), toastConfig)
      .then((res) => res.json());
    return response;
  }

  if (slug === 'prices') {
    const validatedDate = await toast.promise(
      insertPriceSchema.parseAsync(data),
      toastDataValidationTexts,
      toastConfig,
    );
    const options = getOption(validatedDate);
    const response = await toast
      .promise(fetch(`/api/admin/add/${slug}`, options), getPromiseTextAdd(slug), toastConfig)
      .then((res) => res.json());
    return response;
  }
  if (slug === 'futureEvents') {
    const validatedDate = await toast.promise(
      insertFutureEventsSchema.parseAsync(data),
      toastDataValidationTexts,
      toastConfig,
    );
    const options = getOption(validatedDate);
    const response = await toast
      .promise(fetch(`/api/admin/add/${slug}`, options), getPromiseTextAdd(slug), toastConfig)
      .then((res) => res.json());
    return response;
  }

  if (slug === 'faq') {
    const validatedDate = await toast.promise(
      insertFaqSchema.parseAsync(data),
      toastDataValidationTexts,
      toastConfig,
    );
    const options = getOption(validatedDate);
    const response = await toast
      .promise(fetch(`/api/admin/add/${slug}`, options), getPromiseTextAdd(slug), toastConfig)
      .then((res) => res.json());
    return response;
  }
};

const getOption = (data: any) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_ROUTE_SECRET,
    },
    body: JSON.stringify(data),
  };
  return options;
};
