import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";
import { SignUpData, Payload, SignInData } from "./interfaces/interfaces";
import { toast } from "react-toastify";

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
          localStorage.setItem("logged_in", "true");
          toast.success("User logged successfully");
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUMutation, useRegisterUMutation } = authApiSlice;
