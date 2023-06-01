import { IServerProps } from '@/app/page';
import { ToastOptions } from 'react-toastify';
export type TSlug = IServerProps['params']['slug'];

export const toastConfig = {
  autoClose: 3000,
  theme: 'dark',
  position: 'top-center',
} as ToastOptions<{}>;


export const getPromiseTextAdd = (slug: TSlug) => {
  if (slug === 'faq') {
    return {
      pending: 'Добавляю FAQ...',
      success: 'Успех! FAQ добавлен 🥰',
      error: 'Ошибка 🤯',
    };
  }
  if (slug === 'futureEvents') {
    return {
      pending: 'Добавляю событие...',
      success: 'Готово! Новое мероприятие добавлено 💃',
      error: 'Ошибка 🤯',
    };
  }
  if (slug === 'prices') {
    return {
      pending: 'Добавляю тариф...',
      success: 'Все супер! Тариф добавлен 🤑',
      error: 'Ошибка 🤯',
    };
  }
  if (slug === 'reviews') {
    return {
      pending: 'Добавляю отзыв...',
      success: 'Отзыв добавлен 🥳',
      error: 'Ошибка 🤯',
    };
  }

  if (slug === 'teachers') {
    return {
      pending: 'Добавляю учителя...',
      success: 'Получилось! Учитель добавлен 🧑‍🏫',
      error: 'Ошибка 🤯',
    };
  }

  if (slug === 'thematicEvents') {
    return {
      pending: 'Добавляю мероприятие...',
      success: 'Тематическое мероприятие добавлено 🤍',
      error: 'Ошибка 🤯',
    };
  } else {
    return {
      pending: 'Добавляю...',
      success: 'Готово 😘',
      error: 'Ошибка 🤯',
    };
  }
};

export const getPromiseTextEdit = (slug: TSlug) => {
    if (slug === 'faq') {
      return {
        pending: 'Изменяю FAQ...',
        success: 'Успех! FAQ скорректирован 🥰',
        error: 'Ошибка 🤯',
      };
    }
    if (slug === 'futureEvents') {
      return {
        pending: 'Изменяю событие...',
        success: 'Готово! Мероприятие изменено 💃',
        error: 'Ошибка 🤯',
      };
    }
    if (slug === 'prices') {
      return {
        pending: 'Изменяю тариф...',
        success: 'Все супер! Тариф скорректирован 🤑',
        error: 'Ошибка 🤯',
      };
    }
    if (slug === 'reviews') {
      return {
        pending: 'Изменяю отзыв...',
        success: 'Отзыв обновлен 🥳',
        error: 'Ошибка 🤯',
      };
    }
  
    if (slug === 'teachers') {
      return {
        pending: 'Изменяю учителя...',
        success: 'Получилось! Учитель обновлен 🧑‍🏫',
        error: 'Ошибка 🤯',
      };
    }
  
    if (slug === 'thematicEvents') {
      return {
        pending: 'Изменяю мероприятие...',
        success: 'Тематическое мероприятие обновлено 🤍',
        error: 'Ошибка 🤯',
      };
    } else {
      return {
        pending: 'Изменяю...',
        success: 'Обновлено 😘',
        error: 'Ошибка 🤯',
      };
    }
  };
  