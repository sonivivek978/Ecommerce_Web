import axios from "axios";
import { getStorage } from "../../utils/Auth/Auth";
import { axiosConfig } from "../../services/AxiosConfig";
const API = process.env.REACT_APP_BASE_URL;

export const postRegisterUser = async (
  values: any,
  { rejectWithValue }: any
) => {
  const Apis = axiosConfig("application/json");
  const { email, password, name } = values;
  try {
    const response = await Apis.post(`/register`, {
      name: name,
      email: email,
      password: password,
    });
    if (!response) {
      throw new Error("Failed to post data");
    }
    return await response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const postUploadProfile = async (
  values: any,
  { rejectWithValue }: any
) => {
  const Apis = axiosConfig("multipart/form-data");

  const { userImage } = values;
  const email = getStorage("user_email");
  try {
    const response = await Apis.post(`/upload`, {
      email: email,
      userImage: userImage,
    });
    if (!response) {
      throw new Error("Failed to post data");
    }
    return await response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};
