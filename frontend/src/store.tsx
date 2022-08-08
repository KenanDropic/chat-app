import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./app/api/apiSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(),
  devTools: true,
});

// disable devTools in production
// disable synchronize(backend app module) in production

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
