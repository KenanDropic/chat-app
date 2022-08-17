import { User } from "../../auth/interfaces/interfaces";

interface Room {
  id: number;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  users: User[];
}

interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  previosPage: number | boolean;
  nextPage: number | boolean;
  skip: number;
}

export type { Room, Meta };
