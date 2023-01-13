import * as yup from "yup";

export const MIN_DESC = 20;

export const quizErrMsg = {
  title: {
    required: "Title is required",
  },
  description: {
    required: "Description is required",
    len: `Description should be at least ${MIN_DESC} characters`,
  },
  tag: {
    required: "Tag is required",
  },
};

export const quizSchema = yup.object({
  title: yup.string().required(quizErrMsg.title.required),
  description: yup
    .string()
    .required(quizErrMsg.description.required)
    .test("len", quizErrMsg.description.len, (val) =>
      val ? val.length >= MIN_DESC : false
    ),
  tag: yup.string().required(quizErrMsg.tag.required),
});
