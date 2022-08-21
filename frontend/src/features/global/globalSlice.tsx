import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  status: string;
  showPassword: boolean;
  showModal: boolean;
  showSidebar: boolean;
}

const initialState: InitialState = {
  status: "signin",
  showPassword: false,
  showModal: false,
  showSidebar: false,
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
    setShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { setStatus, setShowPassword, setShowModal, setShowSidebar } =
  globalSlice.actions;

export default globalSlice.reducer;
