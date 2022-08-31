import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../components/interfaces/interfaces";
import { Meta } from "../socket/interfaces/interfaces";

interface InitialState {
  data: Message[];
  meta: Meta;
  loading: boolean;
  addedNewMessage: boolean;
}

const initialState: InitialState = {
  data: [],
  meta: {
    page: 1,
    take: 15,
    itemCount: 1,
    previosPage: 0,
    nextPage: 0,
    pageCount: 1,
    skip: 0,
  },
  loading: false,
  addedNewMessage: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<InitialState>) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.meta.page = action.payload;
      state.meta.skip = (state.meta.page - 1) * state.meta.take;
    },
    setTake: (state, action: PayloadAction<number>) => {
      state.meta.take = action.payload;
      // state.loading = false;
    },
    pushNewMessage: (state, action: PayloadAction<Message>) => {
      // unshift - dodavanje elementa na početak niza
      state.data.unshift(action.payload);
    },
    setAddedNewMessage: (state, action: PayloadAction<boolean>) => {
      state.addedNewMessage = action.payload;
    },
  },
});

export const {
  setMessages,
  setPage,
  setTake,
  pushNewMessage,
  setAddedNewMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
