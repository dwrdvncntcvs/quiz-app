import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "../services/quiz";
import { userApi } from "../services/user";
import modalReducer from "./slice/modalSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    modal: modalReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(quizApi.middleware),
});
