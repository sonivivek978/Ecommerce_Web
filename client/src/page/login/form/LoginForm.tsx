import React from "react";
import style from "./LoginForm.module.scss";
import {
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, FormikHandlers, FormikState } from "formik";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export const LoginForm = (
  props: Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<any>, "errors" | "values" | "touched">
) => {
  const { handleChange, handleBlur, errors, values, touched } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <form>
        <div className={style.loginField}>
          <TextField
            className={style.loginField__inner}
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
        <div className={style.loginField}>
          <TextField
            className={style.loginField__inner}
            id="standard-basic"
            label="Password"
            variant="standard"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onMouseLeave={(val) => setShowPassword(false)}
                    onMouseEnter={(val) => setShowPassword(true)}
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ErrorMessage name="password" component="div">
            {(msg) => <span className="ValidationMessage">{msg}</span>}
          </ErrorMessage>
        </div>
        <Typography>
          Don't have an account?&nbsp;
          <Link href="/register" variant="body2">
             Register
          </Link>
        </Typography>
      </form>
    </>
  );
};
