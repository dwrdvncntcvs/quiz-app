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
    getUserQuizzes: builder.query({
      query: (userId) => ({
        url: `/quizzes/${userId}`,
        method: "GET",
      }),
      // invalidatesTags: ["Quiz"],
    }),
    createQuiz: builder.mutation({
      query: ({ quizData }) => {
        return {
          url: "/quizzes",
          method: "POST",
          body: quizData,
        };
      },
    }),
    deleteQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/quizzes/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useGetQuizQuery,
  useGetUserQuizzesQuery,
  useCreateQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
