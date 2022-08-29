import React from "react";
import { Spinner } from ".";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { MessagesWrapper } from "../styles/MessagesWrapper";
import { Message } from "./interfaces/interfaces";

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: messages } = useAppSelector((state) => state.messages);

  return messages.length < 0 ? (
    <Spinner />
  ) : (
    <MessagesWrapper>
      {messages.map((message: Message) => {
        return <span key={message.id}>{message.text}</span>;
      })}
    </MessagesWrapper>
  );
};

export default Messages;
