import React from "react";
import style from "./NotFound.module.scss";
import { Typography } from "@mui/material";
export const NotFound = () => {
  return (
    <div className={style.notFound}>
      <Typography>404 | Page not found</Typography>
    </div>
  );
};
