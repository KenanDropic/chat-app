import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  status: string;
  showPassword: boolean;
  showModal: boolean;
  showSidebar: boolean;
  scroll: boolean;
  showAddUserModal: boolean;
}

const initialState: InitialState = {
  status: "signin",
  showPassword: false,
  showModal: false,
  showSidebar: false,
  scroll: false,
  showAddUserModal: false,
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
    setShowAddUserModal: (state) => {
      state.showAddUserModal = !state.showAddUserModal;
    },
  },
});

export const {
  setStatus,
  setShowPassword,
  setShowModal,
  setShowSidebar,
  setScroll,
  setShowAddUserModal,
} = globalSlice.actions;

export default globalSlice.reducer;
