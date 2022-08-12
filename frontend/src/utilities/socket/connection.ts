import React from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  extraHeaders: {
    authorization: localStorage.getItem("tk")
      ? (localStorage.getItem("tk") as string)
      : "",
  },
});
export const SocketContext = React.createContext(socket);
