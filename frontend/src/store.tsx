import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(),
  devTools: true,
});

// disable devTools in production
// disable synchronize(backend app module) in production

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
