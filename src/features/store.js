import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "../services/quiz";
import { userApi } from "../services/user";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(quizApi.middleware),
});
