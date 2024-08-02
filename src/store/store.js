import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import itemsSlice from './itemsSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    items: itemsSlice
  }
})

export default store