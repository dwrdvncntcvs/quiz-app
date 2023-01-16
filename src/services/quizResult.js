import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { customQuery } from "./config";

const quizResultApi = createApi({
  reducerPath: "quizResultApi",
  baseQuery: customQuery,
  endpoints: (builder) => ({}),
});

export default quizResultApi;

export const {} = quizResultApi;
