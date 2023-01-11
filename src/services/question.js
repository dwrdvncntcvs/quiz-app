import { createApi } from "@reduxjs/toolkit/query/react";
import { customQuery } from "./config";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: customQuery,
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: ({ quizId }) => ({
        url: `/questions/${quizId}`,
        method: "GET",
      }),
    }),
    createQuestion: builder.mutation({
      query: ({ quizId, questionData }) => ({
        url: `/questions/${quizId}`,
        method: "POST",
        body: questionData,
      }),
    }),
  }),
});

export const { useGetQuestionsQuery, useCreateQuestionMutation } = questionApi;
