import { Button, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Spinner } from ".";
import { useLazyGetMeQuery } from "../features/auth/authApiSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { setPage, setUserRooms } from "../features/socket/socketSlice";
import useLocalStorage from "../utilities/customHooks/useLocalStorage";

const Dashboard: React.FC = () => {
  const isMounted = useRef<boolean>(true);
  const socketRef = useRef<any>(null);
  const [logged, setLogged] = useLocalStorage("logged_in", "");

  const [getMe, { isLoading, data: user }] = useLazyGetMeQuery();
  const dispatch = useAppDispatch();
  const {
    data,
    socket,
    meta: { page, take, pageCount, skip },
  } = useAppSelector((state) => state.socket);

  const currentUser = async () => {
    await getMe().unwrap();
  };

  const createRoom = () => {
    let room = {
      name: "Testroom2",
    };
    return socket.emit("createRoom", room);
  };

  const getUserRooms = () => {
    socketRef.current.on("rooms", (...args: any) => {
      console.log("socket ON rooms");
      return dispatch(setUserRooms(args[0]));
    });
  };

  const getRooms = () => {
    socketRef.current.emit("paginateRoom", { page, take, skip });
  };

  // get current user
  useEffect(() => {
    if (isMounted && logged) {
      currentUser();
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  // get paginated user rooms
  useEffect(() => {
    if (socketRef.current !== null) {
      getRooms();
    }
  }, [page, take]);

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
    } catch (error) {}

    return () => {
      socketRef.current = null;
    };
  }, []);

  // handle page change
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      Dashboard Works!!
      <Button variant="outlined" onClick={() => createRoom()}>
        Create Room
      </Button>
      <br />
      <hr />
      <div>
        <h3>My chatrooms</h3>
        <ul>
          {data.map((room, idx) => {
            return (
              <li key={idx}>
                Room ID:{room.id}
                {<br />} Name: {room.name}
              </li>
            );
          })}
        </ul>
        <Box component="div" sx={{ margin: "40px auto" }}>
          <Pagination
            variant="outlined"
            count={pageCount}
            onChange={handlePageChange}
          />
        </Box>
      </div>
      <div>
        <h3>My rooms</h3>
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;
