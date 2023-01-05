import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../variables";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: () => ({
        url: "/quizzes",
        method: "GET",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const { useGetQuizQuery } = quizApi;
