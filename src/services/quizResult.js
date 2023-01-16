import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { customQuery } from "./config";

const quizResultApi = createApi({
  reducerPath: "quizResultApi",
  baseQuery: customQuery,
  tagTypes: ["QuizResult"],
  endpoints: (builder) => ({
    saveScore: builder.mutation({
      query: ({ quizId, assessmentData }) => ({
        url: `/quizResults/${quizId}`,
        method: "POST",
        body: assessmentData,
      }),
    }),
    getQuizResult: builder.query({
      query: ({ quizResultId }) => ({
        url: `/quizResults/quiz/${quizResultId}`,
        method: "GET",
      }),
      invalidatesTags: ["QuizResult"],
    }),
  }),
});

export default quizResultApi;

export const { useSaveScoreMutation, useGetQuizResultQuery } = quizResultApi;
