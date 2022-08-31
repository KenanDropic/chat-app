import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Spinner } from "./index";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import {
  setIsRoomCreated,
  setOnlineCount,
  setUserRooms,
} from "../features/socket/socketSlice";
import { Sidebar } from "./index";

const Dashboard: React.FC = () => {
  const socketRef = useRef<any>(null);

  const { data: user, isLoading } = useGetMeQuery();
  const dispatch = useAppDispatch();
  const {
    data,
    meta: { page, take, skip, itemCount },
    isRoomCreated,
    roomname,
  } = useAppSelector((state) => state.socket);

  const getUserRooms = async () => {
    await socketRef.current.on("rooms", (...args: any) => {
      // console.log("socket ON rooms");
      return dispatch(setUserRooms(args[0]));
    });
  };

  const getRooms = async () => {
    await socketRef.current.emit("paginateRoom", {
      page,
      take,
      skip,
      roomname,
    });
  };

  const findConnectedUsers = async () => {
    await socketRef.current.on("connectedUsers", (...args: any) => {
      dispatch(setOnlineCount(args[0]));
      // dispatch(setOnlineUsers(args[0]));
    });
  };

  // get paginated user rooms
  useEffect(() => {
    if (socketRef.current !== null) {
      getRooms();
    }
  }, [page, take, itemCount, roomname]);

  // get user rooms on first connection
  useEffect(() => {
    if (socketRef.current === null) {
      socketRef.current = io("http://localhost:5000", {
        extraHeaders: {
          authorization: localStorage.getItem("tk")
            ? (localStorage.getItem("tk") as string)
            : "",
        },
      });
    }
    try {
      getUserRooms();
      findConnectedUsers();
    } catch (error) {}

    return () => {
      socketRef.current = null;
      dispatch(setIsRoomCreated(false));
    };
  }, [isRoomCreated]);

  return isLoading ? <Spinner /> : <Sidebar data={data} refrence={socketRef} />;
};

export default Dashboard;
