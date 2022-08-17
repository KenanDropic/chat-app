import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "./interfaces/interfaces";

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
  searchKeyword: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<InitialState>) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
    setSearchword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const { setUsers, setSearchword } = authSlice.actions;

export default authSlice.reducer;
