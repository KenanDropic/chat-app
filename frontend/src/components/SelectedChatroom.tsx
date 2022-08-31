import React, { useEffect, useRef } from "react";
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
  setAddedNewMessage,
  setMessages,
  setTake,
} from "../features/messages/messagesSlice";
import { MessageSpanWrapper, MessageWrapper } from "../styles/MessagesWrapper";
import Spinner from "./Spinner";

const SelectedChatroom: React.FC<RefrenceRoomProps> = ({ refrence }) => {
  const messagesEndRef = useRef<any>();

  const dispatch = useAppDispatch();
  const { currentRoom, onlineUsers, onlineCount } = useAppSelector(
    (state) => state.socket
  );
  const {
    data: messages,
    meta: { take, itemCount },
    loading,
    addedNewMessage,
  } = useAppSelector((state) => state.messages);
  const { user } = useAppSelector((state) => state.auth);
  const { scroll } = useAppSelector((state) => state.global);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<SendMessage>({});

  const findMessagesForRoom = async () => {
    if (refrence.current !== null) {
      await refrence.current.on("messages", (...args: any) => {
        console.log("messages:", args[0]);
        dispatch(setMessages(args[0]));
      });
    }
  };

  // add new message into already existing messages
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
    findMessagesForRoom();
  }, [itemCount]);

  useEffect(() => {
    pushMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();

    // scroll to bottom only when new message is added and when we scrolled to to top
    return () => {
      dispatch(setAddedNewMessage(false));
    };
  }, [scroll, addedNewMessage]);

  const onSubmit = (data: SendMessage) => {
    const obj = {
      ...data,
      room: currentRoom,
    };
    refrence.current.emit("addMessage", obj);
    dispatch(setAddedNewMessage(true));
    reset();
  };

  return loading ? (
    <Spinner />
  ) : (
    <SelectedChatroomWrapper>
      {currentRoom !== null && (
        <>
          <HeaderWrapper>
            <h3># {currentRoom.name}</h3>
            <h3>Online {onlineCount}</h3>
          </HeaderWrapper>
          <hr />
          <ContentWrapper
            onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
              // if scrolled to the top,add +5 onto take. If that sum is greater than itemCount return nothing,else dispatch that sum and we get more messages.
              if (
                (e.target as HTMLDivElement).clientHeight ===
                (e.target as HTMLDivElement).scrollHeight +
                  (e.target as HTMLDivElement).scrollTop -
                  1
              ) {
                let takeMessages = take + 5;
                if (takeMessages > itemCount) {
                  return;
                }
                dispatch(setTake(takeMessages));
              }
            }}
          >
            <div
              style={{ height: "0%", padding: "0px", margin: "0px" }}
              ref={(el) => (messagesEndRef.current = el)}
            ></div>
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
              // since it is column-reverse this txt will be at the bottom,with marginBottom: auto it is going to be pushed to the top.
              <MessageSpanWrapper style={{ marginBottom: "auto" }}>
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
                  <Button
                    type="submit"
                    sx={{ height: "0px", padding: "0px" }}
                  />
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
