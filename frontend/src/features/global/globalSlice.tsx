import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  status: string;
}

const initialState: InitialState = {
  status: "signin",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = state.status === "signin" ? "signup" : "signin";
    },
  },
});

export const { setStatus } = globalSlice.actions;

export default globalSlice.reducer;
