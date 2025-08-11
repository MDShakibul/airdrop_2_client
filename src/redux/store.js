import { configureStore } from '@reduxjs/toolkit'
import authReducher from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducher,
  },
})

export const selectState = (state) => state;
export const selectAppDispatch = () => store.dispatch;

export const selectRootState = () => store.getState();
export const selectAppDispatchType = typeof store.dispatch;