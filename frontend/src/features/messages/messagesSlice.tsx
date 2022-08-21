import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../components/interfaces/interfaces";
import { Meta } from "../socket/interfaces/interfaces";

interface InitialState {
  data: Message[];
  meta: Meta;
}

const initialState: InitialState = {
  data: [],
  meta: {
    page: 1,
    take: 10,
    itemCount: 1,
    previosPage: 0,
    nextPage: 0,
    pageCount: 1,
    skip: 0,
  },
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
    },
  },
});

export const {
  setMessages,
  setPage,
  setTake,
} = messagesSlice.actions;

export default messagesSlice.reducer;
