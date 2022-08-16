import { apiSlice } from "../../app/api/apiSlice";
import { setUsers } from "./usersSlice";
import { InitialState, QueryOptions } from "./interfaces/interfaces";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<InitialState, QueryOptions>({
      query: (data): string | object | any => ({
        url: `users?username=${data.username}`,
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLazyGetUsersQuery } = usersApiSlice;
