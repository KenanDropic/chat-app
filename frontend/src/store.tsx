import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import authReducer from "./features/auth/authSlice";
import socketReducer from "./features/socket/socketSlice";
import usersReducer from "./features/users/usersSlice";
import messagesReducer from "./features/messages/messagesSlice";
import { apiSlice } from "./app/api/apiSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    socket: socketReducer,
    users: usersReducer,
    messages: messagesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["socket/setSocket"],
        ignoredPaths: [
          "socket.socket",
          "socket.currentRoom.created_at",
          "socket.currentRoom.updated_at",
        ],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

// disable devTools in production
// disable synchronize(backend app module) in production

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
