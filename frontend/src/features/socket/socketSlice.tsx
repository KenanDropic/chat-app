import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meta, Room } from "./interfaces/interfaces";

interface InitialState {
  data: Room[];
  meta: Meta;
  socket: any;
  currentRoom: Room | null;
  isRoomCreated: boolean;
  roomname: string;
}

const initialState: InitialState = {
  data: [],
  meta: {
    page: 1,
    take: 8,
    itemCount: 1,
    previosPage: 0,
    nextPage: 0,
    pageCount: 1,
    skip: 0,
  },
  socket: null,
  currentRoom: null,
  isRoomCreated: false,
  roomname: "",
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
    setTake: (state, action: PayloadAction<number>) => {
      state.meta.take = action.payload;
    },
    setCurrentRoom: (state, action: PayloadAction<Room>) => {
      state.currentRoom = action.payload;
    },
    setIsRoomCreated: (state, action: PayloadAction<boolean>) => {
      state.isRoomCreated = action.payload;
    },
    setRoomname: (state, action: PayloadAction<string>) => {
      state.roomname = action.payload;
    },
  },
});

export const {
  setUserRooms,
  setSocket,
  setPage,
  setTake,
  setCurrentRoom,
  setIsRoomCreated,
  setRoomname,
} = socketSlice.actions;

export default socketSlice.reducer;
