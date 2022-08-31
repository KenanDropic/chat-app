import { Pagination } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { setScroll } from "../features/global/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { Room } from "../features/socket/interfaces/interfaces";
import { setCurrentRoom, setPage } from "../features/socket/socketSlice";
import { ChatroomsWrapper } from "../styles/ChatroomsWrapper";
import moment from "moment";

interface Props {
  data: any;
  refrence: any;
}

const Chatrooms: React.FC<Props> = ({ data, refrence }) => {
  const [roomLocalState, setRoomLocalState] = useState<Room>();

  const dispatch = useAppDispatch();
  const {
    meta: { page, pageCount },
  } = useAppSelector((state) => state.socket);
  const { showSidebar } = useAppSelector((state) => state.global);
  const { currentRoom } = useAppSelector((state) => state.socket);
  const {
    data: messages,
    meta: { page: pageMsg, take, skip },
  } = useAppSelector((state) => state.messages);

  // handle page change
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  // select room
  const selectRoom: (room: Room) => void = (room: Room) => {
    // giving a signal that we should scroll to the bottom of the chat
    dispatch(setScroll(true));

    // emit leaveRoom before joining,so connections that are not viable anymore can be destroyed
    refrence.current.emit("leaveRoom", currentRoom);

    // emit joinRoom event & set current room in redux state
    refrence.current.emit("findConnected", room);
    refrence.current.emit("joinRoom", {
      room,
      meta: {
        pageMsg,
        take: 15, // always reset 'take' when choosing new chatroom
        skip,
      },
    });

    dispatch(setCurrentRoom(room));
  };

  useEffect(() => {
    if (refrence.current !== null && roomLocalState !== undefined) {
      refrence?.current.emit("joinRoom", {
        room: roomLocalState,
        meta: {
          pageMsg,
          take,
          skip,
        },
      });
    }
  }, [take]);

  return (
    <>
      <ChatroomsWrapper sx={{ display: `${showSidebar ? "block" : "none"}` }}>
        <h3>Chatrooms</h3>
        <ul className="menu-links">
          {data.map((room: Room, idx: number) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  setRoomLocalState(room);
                  selectRoom(room);
                }}
              >
                {room.name} - {moment(room.created_at).format("MM/d/YY")}
              </li>
            );
          })}
        </ul>
      </ChatroomsWrapper>
      <div
        style={{
          display: `${showSidebar ? "flex" : "none"}`,
          justifyContent: "center",
        }}
      >
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </div>
    </>
  );
};

export default Chatrooms;
