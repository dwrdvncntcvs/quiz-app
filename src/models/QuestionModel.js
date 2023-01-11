import * as yup from "yup";

export const questionSchema = yup.object({
  question: yup.string().required("Question could not be blank"),
  options: yup.array().of(
    yup.object({
      option: yup.string().required("Option could not be blank"),
      isCorrect: yup.boolean(),
    })
  ),
});
