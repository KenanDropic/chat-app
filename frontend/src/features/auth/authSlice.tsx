import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./interfaces/interfaces";

interface InitialState {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      localStorage.setItem("logged_in", "false");
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { logOut, setUser } = authSlice.actions;

export default authSlice.reducer;
