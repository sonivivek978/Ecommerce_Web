import { getStorage, removeStorage, setStorage } from "../../utils/Auth/Auth";
import { axiosConfig } from "../../services/AxiosConfig";
import { AxiosResponse } from "axios";

export const postLoginUser = async (values: any, { rejectWithValue }: any) => {
  const Apis = axiosConfig("application/json");
  const { email, password } = values;
  try {
    const response = await Apis.post(`/session`, {
      email: email,
      password: password,
    });
    if (!response) {
      throw new Error("Failed to post data");
    }
    if (response?.status == 200) {
      setStorage("userAUTHToken", response?.data?.token);
      setStorage("user_name", response?.data?.name);
      setStorage("user_email", response?.data?.email);
      setStorage("user_profile", response?.data?.userImage);
      expiredSession();
    }
    return await response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const RefreshSession = async (): Promise<AxiosResponse | undefined> => {
  const Apis = axiosConfig("application/json");
  try {
    const response = await Apis.get("/refresh");
    if (response) {
      expiredSession()
      return response;
    }
  } catch (error: any) {
    throw error;
  }
};

export const expiredSession = () => {
  const previousStringDate = new Date(getStorage("previousDate"));
  const previousDate = previousStringDate ? new Date(previousStringDate) : null;
  const currentDate = new Date();

  if (!previousDate || currentDate.getDate() !== previousDate.getDate()) {
    removeStorage();
    setStorage("previousDate", currentDate.toString());
  }
};
