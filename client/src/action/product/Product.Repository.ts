import { AxiosResponse } from "axios";
import { axiosConfig } from "../../services/AxiosConfig";

export const getProduct = async () => {
  const Apis = axiosConfig("application/json");
  try {
    const response = await Apis.get(`/product`);
    if (!response) {
      throw new Error("Failed to post data");
    }
    if (response?.status == 200) {
      return response;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getProductDetails = async (args: {
  productId: string;
}): Promise<AxiosResponse | any> => {
  const Apis = axiosConfig("application/json");
  const { productId } = args;
  try {
    const response = await Apis.get(`/product/${productId}`);
    if (!response) {
      throw new Error("Failed to post data");
    }
    if (response?.status == 200) {
      return response;
    }
  } catch (error: any) {
    throw error;
  }
};
