import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Chat = {
  id: string;
  name: string;
}

interface ChatsState {
  chats: Chat[];
}

// Define the initial state using that type
const initialState: ChatsState = {
  chats: [],
}

export const CHATS_SLICE_NAME = 'chats';

export const chatsSlice = createSlice({
  name: CHATS_SLICE_NAME,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    add: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload)
    },
  }
})

export const actions = chatsSlice.actions;

export default chatsSlice.reducer;
