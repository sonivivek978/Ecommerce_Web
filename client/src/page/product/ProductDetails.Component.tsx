import React, { useEffect } from "react";
import { ProductDetails } from "./details/ProductDetails";
import { useAppDispatch } from "../../Store";
import { getProductDetailsAction } from "./ProductDetails.Reducer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProductDetailsComponent = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const productId = params?.id;
  const { productDetails } = useSelector((data: any) => data);
  console.log("data: ", productDetails?.data?.data);
  useEffect(() => {
    dispatch(getProductDetailsAction({ productId: productId ?? "" }));
  }, []);

  return (
    <div className="productDetails">
      <ProductDetails
        item={productDetails?.data?.data}
        isLoading={productDetails?.data?.isLoading}
        error={productDetails?.data?.error}
      />
    </div>
  );
};
