import React, { useEffect } from "react";
import { CartList } from "./cart/CartList";
import { useAppDispatch } from "../../Store";
import { useSelector } from "react-redux";
import { getCartAction } from "./CartComponent.Reducer";
import style from "./CartComponent.module.scss";

export const CartComponent = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((data: any) => data.refresh);
  const CartListdata = useSelector((data: any) => data.getCart);
  const userId = data?.data?.id;

  useEffect(() => {
    dispatch(getCartAction({ userId: userId }));
  }, []);
  
  return (
    <div className={style.CartComponentBody}>
      <CartList
        item={CartListdata?.data?.data}
        error={CartListdata?.data?.error}
        isLoading={CartListdata?.data?.isLoading}
      />
    </div>
  );
};
