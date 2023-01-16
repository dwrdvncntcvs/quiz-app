import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "../services/quiz";
import { userApi } from "../services/user";
import modalReducer from "./slice/modalSlice";
import authReducer from "./slice/authSlice";
import { questionApi } from "../services/question";
import quizResultApi from "../services/quizResult";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [quizResultApi.reducerPath]: quizResultApi.reducer,
    modal: modalReducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(quizApi.middleware)
      .concat(questionApi.middleware)
      .concat(quizResultApi.middleware),
});
