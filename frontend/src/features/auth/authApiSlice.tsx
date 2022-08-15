import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials, setUser } from "./authSlice";
import { SignUpData, Payload, SignInData, User } from "./interfaces/interfaces";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { setSocket } from "../socket/socketSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerU: builder.mutation<Payload, SignUpData>({
      query: (data: SignUpData): string | object | any => ({
        url: "auth/register",
        method: "POST",
        body: { ...data },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.accessToken as string));
          // localStorage.setItem("logged_in", "true");
          toast.success("User registered successfully");
        } catch (error) {}
      },
    }),
    loginU: builder.mutation<Payload, SignInData>({
      query: (data: SignInData): string | object | any => ({
        url: "auth/login",
        method: "POST",
        body: { ...data },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.accessToken as string));
          localStorage.setItem("logged_in", "true");
          toast.success("User logged successfully");
        } catch (error) {}
      },
    }),
    getMe: builder.query<User, void>({
      query: (): string | object | any => ({
        url: "auth/me",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));

          // connect socket client to socket server
          // const socket = io("http://localhost:5000", {
          //   extraHeaders: {
          //     authorization: localStorage.getItem("tk")
          //       ? (localStorage.getItem("tk") as string)
          //       : "",
          //   },
          // });
          // dispatch(setSocket(socket));
        } catch (error) {}
      },
    }),
    logout: builder.mutation<void, void>({
      query: (): string | object | any => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const isFinished = await queryFulfilled;

          if (isFinished) {
            dispatch(logOut());
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useLoginUMutation,
  useRegisterUMutation,
  useLazyGetMeQuery,
  useGetMeQuery,
  useLogoutMutation,
} = authApiSlice;
