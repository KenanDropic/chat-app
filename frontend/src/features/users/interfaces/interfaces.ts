import { User } from "../../auth/interfaces/interfaces";
import { Meta } from "../../socket/interfaces/interfaces";

interface QueryOptions {
  username: string;
}
interface InitialState {
  data: User[] | null;
  meta: Meta;
  searchKeyword: string;
}

export type { QueryOptions, InitialState };
