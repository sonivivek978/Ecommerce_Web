import React from "react";
import { RegisterForm } from "./form/RegisterForm";
import style from "./RegisterComponent.module.scss";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import background from "../../assets/background.jpg";
import { RegisterFormValidation } from "./form/RegisterFormValidation";
import { RegisterAction } from "./RegisterComponent.Reducer";
import { useAppDispatch } from "../../Store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const RegisterComponent = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const emptyRegisterValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const state = useSelector((data: any) => data?.register);
  return (
    <div>
      <img
        className={style.backgroundImage}
        src={background}
        height={"100%"}
        width={"100%"}
      />
      <div className={style.registerBody}>
        <Typography variant="h5">Register</Typography>
        <Formik
          initialValues={emptyRegisterValues}
          onSubmit={(values) =>
            dispatch(RegisterAction(values)).then(
              (data) =>
                data?.payload?.status === 200 &&
                data?.payload?.data?.verified &&
                navigation("/login")
            )
          }
          validate={(values) => RegisterFormValidation(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <RegisterForm
                values={values}
                errors={state?.error}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <Typography color={"red"}>{state?.error}</Typography>
              {!state?.data?.data?.verified && (
                <Typography sx={{ color: "green" }}>
                  {state?.data?.data?.message}
                </Typography>
              )}
              <div className={style.registerBtn}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={style.registerSubmitButton}
                >
                  <span style={{ marginRight: "10px" }}>Register</span>
                  {state?.isLoading && (
                    <CircularProgress size={"1.1rem"} color="inherit" />
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
