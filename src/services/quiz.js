import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { customQuery } from "./config";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: customQuery,
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: () => ({
        url: "/quizzes",
        method: "GET",
      }),
      // invalidatesTags: ["Quiz"],
    }),
  }),
});

export const { useGetQuizQuery } = quizApi;
