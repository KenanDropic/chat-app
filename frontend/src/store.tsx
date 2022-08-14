import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import authReducer from "./features/auth/authSlice";
import socketReducer from "./features/socket/socketSlice";
import { apiSlice } from "./app/api/apiSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    socket: socketReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["socket/setSocket"],
        ignoredPaths: ["socket.socket"],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

// disable devTools in production
// disable synchronize(backend app module) in production

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
