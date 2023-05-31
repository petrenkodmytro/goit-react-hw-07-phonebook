import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://64739e80d784bccb4a3cc766.mockapi.io';

// Redux Toolkit спрощує процес оголошення асинхронного генератора екшену за допомогою функції createAsyncThunk(). Першим аргументом вона приймає тип екшену, а другим функцію, яка повинна виконати HTTP-запит і повернути проміс із даними, які стануть значенням payload. Вона повертає асинхронний генератор екшену (операцію) при запуску якого виконається функція з кодом запиту. Функція createAsyncThunk() автоматично створює екшени, що представляють життєвий цикл HTTP-запиту, і відправляє їх у правильному порядку, залежно від статусу запиту.

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      // console.log('fetchContacts', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      // console.log('addContact', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      // console.log('deleteContact', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
