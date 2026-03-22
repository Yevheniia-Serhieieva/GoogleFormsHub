import { configureStore } from '@reduxjs/toolkit';
import { headerReducer } from './components/Header/headerSlice';
import { api } from './api/api';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
