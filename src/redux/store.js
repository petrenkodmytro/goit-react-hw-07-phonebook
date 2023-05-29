import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

// store - містить повний стан програми, методи доступу до стану та відправлення екшенів. У програмі може бути лише один стор. Для створення стора є функція createStore(), яка приймає кілька параметрів та повертає новий об'єкт стора.

// Redux Toolkit надає функцію configureStore(options), яка обертає оригінальний createStore(), єдиним аргументом очікує об'єкт параметрів та налаштовує деякі корисні інструменти розробки як частина процесу створення стора.
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

// console.log('store', store);

// https://64739e80d784bccb4a3cc766.mockapi.io
