import * as yup from "yup";

export const QUESTION_CHAR_LIMIT =  15;

export const questionErrMsg = {
  question: {
    required: "Question could not be blank",
    length: `Question should have at least ${QUESTION_CHAR_LIMIT} characters`,
  },
  options: {
    array: {
      option: {
        required: "Option could not be blank",
      },
    },
  },
};

export const questionSchema = yup.object({
  question: yup
    .string()
    .required(questionErrMsg.question.required)
    .test("len", questionErrMsg.question.length, (val) =>
      val ? val.length >= QUESTION_CHAR_LIMIT : false
    ),
  options: yup.array().of(
    yup.object({
      option: yup
        .string()
        .required(questionErrMsg.options.array.option.required),
      isCorrect: yup.boolean(),
    })
  ),
});
