import React from "react";
import style from "./RegisterForm.module.scss";
import {
  ErrorMessage,
  FormikHandlers,
  FormikHelpers,
  FormikState,
} from "formik";
import { TextField } from "@mui/material";

export const RegisterForm = (
  props: Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<any>, "errors" | "values" | "touched"> &
    Pick<FormikHelpers<any>, "setFieldValue">
) => {
  const { handleChange, handleBlur, errors, values, touched, setFieldValue } =
    props;

  return (
    <form>
      <div className={style.registerField}>
        <TextField
          className={style.registerField__inner}
          id="standard-basic"
          label="Name"
          variant="standard"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage name="name" component="p">
          {(msg) => <span className="ValidationMessage">{msg}</span>}
        </ErrorMessage>
      </div>

      <div className={style.registerField}>
        <TextField
          className={style.registerField__inner}
          id="standard-basic"
          label="Email"
          variant="standard"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage name="email" component="p">
          {(msg) => <span className="ValidationMessage">{msg}</span>}
        </ErrorMessage>
      </div>
      <div className={style.registerField}>
        <TextField
          className={style.registerField__inner}
          id="standard-basic"
          label="Password"
          variant="standard"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage name="password" component="div">
          {(msg) => <span className="ValidationMessage">{msg}</span>}
        </ErrorMessage>
      </div>
      <div className={style.registerField}>
        <TextField
          className={style.registerField__inner}
          id="standard-basic"
          label="Confirm password"
          variant="standard"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage name="confirmPassword" component="div">
          {(msg) => <span className="ValidationMessage">{msg}</span>}
        </ErrorMessage>
      </div>
    </form>
  );
};
