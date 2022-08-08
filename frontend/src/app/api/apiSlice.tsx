import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex, MutexInterface } from "async-mutex";
import {
  BaseQueryFn,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { logOut } from "../../features/auth/authSlice";

const mutex = new Mutex();

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/",
    credentials: "include",
  });

const baseQueryWithReauth = async (
  args: string,
  api: any,
  extraOptions: { shout?: boolean }
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result: QueryReturnValue<unknown, FetchBaseQueryError, {}> =
    await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (
      (result.error as any).originalStatus === 401 ||
      result.error.status === 401
    ) {
      if (!mutex.isLocked()) {
        const release: MutexInterface.Releaser = await mutex.acquire();

        try {
          // console.log("sending refresh token ");
          const refreshResult: QueryReturnValue<any, FetchBaseQueryError, {}> =
            await baseQuery("auth/refresh", api, extraOptions);

          if (refreshResult.data) {
            console.log("REFRESH RESULT DATA", refreshResult?.data);
            localStorage.setItem("logged_in", "true");
            //retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logOut());
            localStorage.setItem("logged_in", "false");
            // window.location.href = "/login";
          }
        } finally {
          release();
        }
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
