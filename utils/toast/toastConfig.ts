import { ToastOptions } from 'react-toastify';
import { TSlug } from '../handleAddEntry';

export const toastConfig = {
  autoClose: 3000,
  theme: 'dark',
  position: 'top-center',
} as ToastOptions<{}>;

export const toastDataValidationTexts = {
  pending: 'Проверяю данный...',
  success: 'Данные корректны 👍',
  error: 'Ошибка 🤯',
};

export const getPromiseTextAdd = (slug: TSlug) => {
  if (slug === 'faq') {
    return {
      pending: 'Изменияю FAQ...',
      success: 'Успех! FAQ добавлен 🥰',
      error: 'Ошибка 🤯',
    };
  }
  if (slug === 'futureEvents') {
    return {
      pending: 'Изменияю событие...',
      success: 'Готово! Новое мероприятие добавлено 💃',
      error: 'Ошибка 🤯',
    };
  }
  if (slug === 'prices') {
    return {
      pending: 'Изменияю тариф...',
      success: 'Все супер! Тариф добавлен 🤑',
      error: 'Ошибка 🤯',
    };
  }
  if (slug === 'reviews') {
    return {
      pending: 'Изменияю отзыв...',
      success: 'Отзыв добавлен 🥳',
      error: 'Ошибка 🤯',
    };
  }

  if (slug === 'teachers') {
    return {
      pending: 'Изменияю учителя...',
      success: 'Получилось! Учитель добавлен 🧑‍🏫',
      error: 'Ошибка 🤯',
    };
  }

  if (slug === 'thematicEvents') {
    return {
      pending: 'Изменияю мероприятие...',
      success: 'Тематическое мероприятие добавлено 🤍',
      error: 'Ошибка 🤯',
    };
  } else {
    return {
      pending: 'Изменияю...',
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
        pending: 'Изменияю событие...',
        success: 'Готово! Мероприятие изменено 💃',
        error: 'Ошибка 🤯',
      };
    }
    if (slug === 'prices') {
      return {
        pending: 'Изменияю тариф...',
        success: 'Все супер! Тариф скорректирован 🤑',
        error: 'Ошибка 🤯',
      };
    }
    if (slug === 'reviews') {
      return {
        pending: 'Изменияю отзыв...',
        success: 'Отзыв обновлен 🥳',
        error: 'Ошибка 🤯',
      };
    }
  
    if (slug === 'teachers') {
      return {
        pending: 'Изменияю учителя...',
        success: 'Получилось! Учитель обновлен 🧑‍🏫',
        error: 'Ошибка 🤯',
      };
    }
  
    if (slug === 'thematicEvents') {
      return {
        pending: 'Изменияю мероприятие...',
        success: 'Тематическое мероприятие обновлено 🤍',
        error: 'Ошибка 🤯',
      };
    } else {
      return {
        pending: 'Изменияю...',
        success: 'Обновлено 😘',
        error: 'Ошибка 🤯',
      };
    }
  };
  