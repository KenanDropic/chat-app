import { MutableRefObject } from "react";
import { User } from "../../features/auth/interfaces/interfaces";
import { Room } from "../../features/socket/interfaces/interfaces";

interface FormProps {
  status: string;
}
interface FormValues {
  username?: string;
  email: string;
  password: string;
}
interface Roles {
  allowedRoles: string[];
}

interface CreateRoomValues {
  name: string;
  description: string;
  users?: (string | User)[];
}

interface RefrenceRoomProps {
  refrence: MutableRefObject<any>;
  data?: any;
}

interface Message {
  text: string;
  user: User;
  id: number;
  updated_at?: Date;
  created_at?: Date;
}

interface SendMessage {
  text: string;
}

export type {
  FormProps,
  FormValues,
  Roles,
  CreateRoomValues,
  RefrenceRoomProps,
  Message,
  SendMessage,
};
