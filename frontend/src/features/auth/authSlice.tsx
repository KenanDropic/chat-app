import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./interfaces/interfaces";

interface InitialState {
  user: User | null;
  atk: string | null;
}

const initialState: InitialState = {
  user: null,
  atk: localStorage.getItem("tk") ? localStorage.getItem("tk") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.atk = null;
      localStorage.setItem("logged_in", "false");
      localStorage.setItem("tk", "");
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setCredentials: (state, action: PayloadAction<string>) => {
      state.atk = action.payload;
      localStorage.setItem("tk", action.payload);
    },
  },
});

export const { logOut, setUser, setCredentials } = authSlice.actions;

export default authSlice.reducer;
