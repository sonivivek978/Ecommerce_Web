import React from "react";
import axios from "axios";
import { getStorage } from "../utils/Auth/Auth";
const API = process.env.REACT_APP_BASE_URL;

export const axiosConfig = (ContentType: string) => {
  const token = getStorage("userAUTHToken");
  const axiosInstance = axios.create({
    baseURL: API,
    headers: {
      "Content-Type": ContentType,
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return axiosInstance;
};
