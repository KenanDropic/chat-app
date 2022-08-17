import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  status: string;
  showPassword: boolean;
  showModal: boolean;
}

const initialState: InitialState = {
  status: "signin",
  showPassword: false,
  showModal: false,
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
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const { setStatus, setShowPassword, setShowModal } = globalSlice.actions;

export default globalSlice.reducer;
