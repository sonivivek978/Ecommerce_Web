import { FormikValues } from "formik";

export const LoginFormValidation = (values: {
  email: string;
  password: string;
}) => {
  return validationResult({
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  });
};

export const validationResult = (values: FormikValues) => {
  Object.keys(values).forEach((key) => {
    if (values[key] === undefined) {
      delete values[key];
    }
  });
  return values;
};

export const validateEmail = (value: string) => {
  if (!value) {
    return "Email field required";
  }
  return undefined;
};

export const validatePassword = (value: string) => {
  if (!value) {
    return "Password field required";
  }
  return undefined;
};
