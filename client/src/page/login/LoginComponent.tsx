import React from "react";
import style from "./LoginComponent.module.scss";
import { LoginForm } from "./form/LoginForm";
import { Form, Formik } from "formik";
import { Button, CircularProgress, Typography } from "@mui/material";
import { LoginFormValidation } from "./form/LoginFormValidation";
import { useSelector } from "react-redux";
import { LoginAction } from "./LoginComponent.Reducer";
import { useAppDispatch } from "../../Store";
import background from "../../assets/background.jpg";
import { useNavigate } from "react-router-dom";

export const Index = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useSelector((data: any) => data?.login);
  const emptyLoginValues = { email: "", password: "" };

  const redirectPage = (data: any) => {
    data.status === 200 && navigate("/");
  };
  return (
    <div>
      <img
        className={style.backgroundImage}
        src={background}
        height={"100%"}
        width={"100%"}
        alt="Background img"
      />
      <div className={style.loginBody}>
        <Typography variant="h5">Login</Typography>
        <Formik
          initialValues={emptyLoginValues}
          onSubmit={(values) =>
            dispatch(LoginAction(values))
              .unwrap()
              .then((data) => redirectPage(data))
          }
          validate={(values) => LoginFormValidation(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <LoginForm
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <div className={style.loginBtn}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={style.loginSubmitButton}
                >
                  <span style={{ marginRight: "10px" }}>Login</span>
                  {state?.isLoading && (
                    <CircularProgress size={"1.1rem"} color="inherit" />
                  )}
                </Button>
              </div>
              <Typography color={"red"}>{state?.error}</Typography>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
