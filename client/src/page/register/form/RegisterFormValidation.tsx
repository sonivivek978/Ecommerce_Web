import { FormikValues } from "formik";

export const RegisterFormValidation = (values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return validationResult({
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirmPassword: validateConfirmPassword(values),
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

export const validateName = (value: string) => {
  if (!value) {
    return "Name field required";
  }
  return undefined;
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

export const validateConfirmPassword = (value: {
  password: string;
  confirmPassword: string;
}) => {
  if (!value.confirmPassword) {
    return "Confirm password is required ";
  }
  if (value.password !== value.confirmPassword) {
    return "Password did not match";
  }
};
