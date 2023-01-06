import { createApi } from "@reduxjs/toolkit/query/react";
import { customQuery } from "./config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ userData }) => ({
        url: "/users/",
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    authorizeUser: builder.mutation({
      query: ({ authData }) => ({
        url: "/users/auth",
        body: authData,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useCreateUserMutation, useAuthorizeUserMutation } = userApi;
