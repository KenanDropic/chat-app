import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  status: string;
  showPassword: boolean;
  showModal: boolean;
  showSidebar: boolean;
  scroll: boolean;
}

const initialState: InitialState = {
  status: "signin",
  showPassword: false,
  showModal: false,
  showSidebar: false,
  scroll: false,
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
    setScroll: (state, action: PayloadAction<boolean>) => {
      state.scroll = action.payload;
    },
  },
});

export const {
  setStatus,
  setShowPassword,
  setShowModal,
  setShowSidebar,
  setScroll,
} = globalSlice.actions;

export default globalSlice.reducer;
