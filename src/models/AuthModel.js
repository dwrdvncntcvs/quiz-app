import * as yup from "yup";

const SignInSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password Minimum eight characters, at least one letter, one number and one special character"
    ),
});

const SignUpSchema = yup.object({
  first_name: yup
    .string()
    .required("First name is required")
    .matches(/[A-Za-z]/g, "Letters are only allowed"),
  last_name: yup
    .string()
    .required("Last name is required")
    .matches(/[A-Za-z]/g, "Letters are only allowed"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password Minimum eight characters, at least one letter, one number and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});

export { SignInSchema, SignUpSchema };
