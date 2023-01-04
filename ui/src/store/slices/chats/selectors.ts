import { type RootState } from "store";
import { CHATS_SLICE_NAME } from ".";

export const getChats = (state: RootState) => state[CHATS_SLICE_NAME].chats;
