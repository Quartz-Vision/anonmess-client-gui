import { configureStore } from '@reduxjs/toolkit';
import chatsReducer, { CHATS_SLICE_NAME } from './slices/chats';

const store = configureStore({
  reducer: {
    [CHATS_SLICE_NAME]: chatsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
