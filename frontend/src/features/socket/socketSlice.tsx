import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meta, Room } from "./interfaces/interfaces";

interface InitialState {
  data: Room[];
  meta: Meta;
  socket: any;
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
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setUserRooms: (state, action: PayloadAction<InitialState>) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.meta.page = action.payload;
      state.meta.skip = (state.meta.page - 1) * state.meta.take;
    },
  },
});

export const { setUserRooms, setSocket, setPage } = socketSlice.actions;

export default socketSlice.reducer;
