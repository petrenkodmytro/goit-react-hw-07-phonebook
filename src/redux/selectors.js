// Один і той же селектор може використовуватися в декількох місцях програми, що призводить до дублювання коду. Щоб уникнути цього та ще більше структурувати код, всі функції-селектори оголошуються в окремому файлі, після чого імпортуються до компонентів.

// змінні для необхідних частин стану, щоб отримати дані зі стору через хук useSelector(selector)
export const getContacts = state => state.contacts.items;
export const getFilter = state => state.filter;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
