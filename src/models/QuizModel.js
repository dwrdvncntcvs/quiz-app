import * as yup from "yup";

const MIN_DESC = 20;

export const quizSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .required("Description is required")
    .test(
      "len",
      `Description should be at least ${MIN_DESC} characters`,
      (val) => (val ? val.length >= MIN_DESC : false)
    ),
  tag: yup.string().required("Tag is required"),
});
