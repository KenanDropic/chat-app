import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import {
  Message,
  RefrenceRoomProps,
  SendMessage,
} from "./interfaces/interfaces";
import {
  ContentWrapper,
  FooterWrapper,
  HeaderWrapper,
  SelectedChatroomWrapper,
} from "../styles/SelectedChatroom";
import { Button, FormControl, FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import TextFieldIcon from "./TextFieldIcon";
import {
  pushNewMessage,
  setMessages,
} from "../features/messages/messagesSlice";
import { MessageSpanWrapper, MessageWrapper } from "../styles/MessagesWrapper";

const SelectedChatroom: React.FC<RefrenceRoomProps> = ({ refrence }) => {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const { currentRoom, onlineUsers } = useAppSelector((state) => state.socket);
  const { data: messages } = useAppSelector((state) => state.messages);
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SendMessage>({});

  const countOnlineUsersInChatroom = () => {
    let counting: number = 0;
    currentRoom?.users.map((user) => {
      onlineUsers.map((onlineUser) => {
        if (onlineUser.user.id === user.id) {
          counting++;
          setCount(counting);
        }
      });
    });
  };

  const findMessagesForRoom = async () => {
    if (refrence.current !== null) {
      await refrence.current.on("messages", (...args: any) => {
        // console.log("GET MESSAGES:", args[0]);
        dispatch(setMessages(args[0]));
      });
    }
  };

  const pushMessages = () => {
    refrence.current.on("messageAdded", (...args: any) => {
      const message = {
        ...args[0],
      };
      delete message.room;

      dispatch(pushNewMessage(message));
    });
  };

  useEffect(() => {
    if (refrence.current !== null) {
      countOnlineUsersInChatroom();
    }
  }, [refrence]);

  useEffect(() => {
    findMessagesForRoom();
  }, []);

  useEffect(() => {
    pushMessages();
  }, []);

  const onSubmit = (data: SendMessage) => {
    const obj = {
      ...data,
      room: currentRoom,
    };
    refrence.current.emit("addMessage", obj);
    reset();
  };

  return (
    <SelectedChatroomWrapper>
      {currentRoom !== null && (
        <>
          <HeaderWrapper>
            <h3># {currentRoom.name}</h3>
            <h3>Online {count}</h3>
          </HeaderWrapper>
          <hr />
          <ContentWrapper>
            {messages !== null && messages.length > 0 ? (
              messages.map((message: Message) => {
                return (
                  <MessageWrapper key={message.id}>
                    <MessageSpanWrapper
                      style={{
                        marginLeft: `${
                          message.user.username === user?.username ? "auto" : ""
                        }`,
                        backgroundColor: `${
                          message.user.username === user?.username
                            ? "#006AFF"
                            : "#c5c8ce"
                        }`,
                        color: `${
                          message.user.username === user?.username
                            ? "#fff"
                            : "#222"
                        }`,
                      }}
                    >
                      {message.text}
                    </MessageSpanWrapper>
                    <em
                      style={{
                        textAlign: `${
                          message.user.username === user?.username
                            ? "right"
                            : "left"
                        }`,
                      }}
                    >
                      {message.user.username === user?.username
                        ? "You"
                        : message.user.username}
                    </em>
                  </MessageWrapper>
                );
              })
            ) : (
              <MessageSpanWrapper style={{}}>
                No messages currently
              </MessageSpanWrapper>
            )}
          </ContentWrapper>
          <FooterWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <FormControl>
                  <TextFieldIcon
                    label="Type your message..."
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          outline: "none",
                          borderColor: "none",
                          border: "none",
                        },
                      },
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          outline: "none",
                          borderColor: "none",
                          border: "none",
                        },
                      },
                    }}
                    {...register("text", {
                      required: true,
                    })}
                    iconend={
                      <SendIcon onClick={() => console.log("clicked")} />
                    }
                  />
                  <Button type="submit" />
                </FormControl>
              </FormGroup>
            </form>
          </FooterWrapper>
        </>
      )}
    </SelectedChatroomWrapper>
  );
};

export default SelectedChatroom;
