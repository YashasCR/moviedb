import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter';
import authReducer from './auth';
import contentRedcuer from './cardcontent'

const store = configureStore({
  reducer: {  auth: authReducer, filter: filterReducer , cardContent : contentRedcuer},
});

export default store;