import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  status: string;
  showPassword: boolean;
}

const initialState: InitialState = {
  status: "signin",
  showPassword: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = state.status === "signin" ? "signup" : "signin";
    },
    setShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
});

export const { setStatus, setShowPassword } = globalSlice.actions;

export default globalSlice.reducer;
