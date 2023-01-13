import * as yup from "yup";

const authErrMsg = {
  first_name: {
    required: "First Name is required",
    onlyLetters: "Letters are only allowed",
  },
  last_name: {
    required: "Last Name is required",
    onlyLetters: "Letters are only allowed",
  },
  username: {
    required: "Username is required",
  },
  password: {
    required: "Password is required",
    validation:
      "Password Minimum eight characters, at least one letter, one number and one special character",
  },
  confirmPassword: {
    shouldMatch: "Password must match",
  },
};

const SignInSchema = yup.object({
  username: yup.string().required(authErrMsg.username.required),
  password: yup
    .string()
    .required(authErrMsg.password.required)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      authErrMsg.password.validation
    ),
});

const SignUpSchema = yup.object({
  first_name: yup
    .string()
    .required(authErrMsg.first_name.required)
    .matches(/[A-Za-z]/g, authErrMsg.first_name.onlyLetters),
  last_name: yup
    .string()
    .required(authErrMsg.last_name.required)
    .matches(/[A-Za-z]/g, authErrMsg.last_name.onlyLetters),
  username: yup.string().required(authErrMsg.username.required),
  password: yup
    .string()
    .required(authErrMsg.password.required)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      authErrMsg.password.validation
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], authErrMsg.confirmPassword.shouldMatch),
});

export { SignInSchema, SignUpSchema, authErrMsg };
