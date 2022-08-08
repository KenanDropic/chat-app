import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";
import { SignUpData, Payload, SignInData } from "./interfaces/interfaces";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<Payload, SignUpData>({
      query: (data: SignUpData): string | object | any => ({
        url: "auth/register",
        method: "POST",
        body: { ...data },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //   console.log(data);
        } catch (error) {}
      },
    }),
    login: builder.mutation<Payload, SignInData>({
      query: (data: SignInData): string | object | any => ({
        url: "auth/login",
        method: "POST",
        body: { ...data },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          localStorage.setItem("logged_in", "true");
        } catch (error) {}
      },
    }),
  }),
});
