import { AxiosResponse } from "axios";
import { axiosConfig } from "../../services/AxiosConfig";

export const addCart = async (args: {
  userId: string;
  productId: string;
  size: string;
}): Promise<AxiosResponse | any> => {
  const Apis = axiosConfig("application/json");
  const { userId, productId, size } = args;

  try {
    const response = await Apis.post(`/cart/${userId}/product/${productId}`, {
      size: size,
    });
    if (!response) {
      throw new Error("Failed to post data");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCart = async (args: {
  userId: string;
}): Promise<AxiosResponse | any> => {
  const Apis = axiosConfig("application/json");
  const { userId } = args;
  console.log('userId: repo', userId);

  try {
    const response = await Apis.get(`/cart/${userId}`,{});
    if (!response) {
      throw new Error("Failed to post data");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const removeCart = async (args: {
  userId: string;
  productId: string;
}) => {
  const Apis = axiosConfig("application/json");
  const { userId, productId } = args;
  try {
    const response = await Apis.delete(`/cart/${userId}/product/${productId}`);
    if (!response) {
      throw new Error("Failed to post data");
    }
    return response;
  } catch (error) {
    throw error;
  }
};
