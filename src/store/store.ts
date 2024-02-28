import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './actions/studentsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      students: studentsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
