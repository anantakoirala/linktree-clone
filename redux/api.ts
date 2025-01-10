import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Custom base query with token refresh logic
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
  credentials: "include",
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const message = (result.error.data as { message?: string })?.message;

    if (message === "Token expired") {
      try {
        // Try refreshing the token
        const refreshResult = await baseQuery(
          { url: "/api/v1/auth/refresh-token", method: "POST" },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { token } = refreshResult.data as { token: string };

          // Retry the original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Redirect to login if refresh fails
          console.log("redirect if refresh fails");
          //window.location.href = "/sign-in";
        }
      } catch {
        // Refresh failed, redirect to login
        console.log("redirect tologin");
        //window.location.href = "/sign-in";
      }
    } else if (message === "Token not provided") {
      // Redirect to login if token is missing
      console.log("login if token missing");
      //window.location.href = "/sign-in";
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["links"],
});

export const {} = api;
