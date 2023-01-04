import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ userData }) => ({ url: "/users/", body: userData, method: "POST" }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
