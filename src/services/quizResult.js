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
    getAllTakenQuizzes: builder.query({
      query: ({ userId }) => ({
        url: `/quizResults/quiz-taken/${userId}`,
        method: "GET",
      }),
      invalidatesTags: ["QuizResult"],
    }),
    getQuizRecords: builder.query({
      query: ({ userId, quizId }) => ({
        url: `/quizResults/${quizId}/user/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export default quizResultApi;

export const {
  useSaveScoreMutation,
  useGetQuizResultQuery,
  useGetAllTakenQuizzesQuery,
  useGetQuizRecordsQuery,
} = quizResultApi;
