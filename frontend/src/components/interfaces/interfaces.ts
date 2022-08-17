import { MutableRefObject } from "react";
import { User } from "../../features/auth/interfaces/interfaces";

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

interface CreateRoomProps {
  refrence: MutableRefObject<any>;
}

export type { FormProps, FormValues, Roles, CreateRoomValues, CreateRoomProps };
