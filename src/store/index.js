import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter';
import authReducer from './auth';

const store = configureStore({
  reducer: {  auth: authReducer, filter: filterReducer },
});

export default store;