import React, { useState } from "react";
import img from "../../../assets/background.jpg";
import { Button, Divider, Typography } from "@mui/material";
import style from "./ProductDetails.module.scss";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import offers from "../../../assets/offer.jpg";
import Description from "@mui/icons-material/DescriptionOutlined";
import { useAppDispatch } from "../../../Store";
import { addCartAction } from "./AddCart.Reducer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface productDetailsProps {
  item: any;
  isLoading: boolean;
  error: any;
}

export const ProductDetails = (props: productDetailsProps) => {
  const { item, isLoading, error } = props;
  const dispatch = useAppDispatch();
  const { data } = useSelector((data: any) => data.refresh);
  const [productSize, setProductSize] = useState<string>("S");
  const { id } = useParams<{ id: string }>();
  let productId: string;
  if (id) {
    productId = id;
  }

  const userId = data?.data?.id;
  const handleSizeClick = (productSize: { productSize: string }) => {
    setProductSize(productSize?.productSize);
  };
  return (
    <div className={style.productDetailsBody}>
      <div>
        <img src={img} height={600} width={600} />
      </div>
      <div className={style.productDetailsBody_info}>
        <div className={style.productDetailsBody_Prodname}>
          <Typography className={style.productDetails_BoldName}>
            {item?.companyName}
          </Typography>
          <div className={style.productDetailsBody_wishBtn}>
            <FavoriteIcon color="disabled" />
          </div>
        </div>
        <Typography className={style.productDetails_opacity}>
          {item?.productName}
        </Typography>
        <div className={style.productDetails_price_info}>
          <Typography className={style.productDetails_BoldName}>
            <span style={{ fontFamily: "Arial" }}>&#8377;</span>{" "}
            {item?.offerPrice}
          </Typography>
          <Typography className={style.productDetails_offPrice}>
            MRP ${item?.cancelledprice}
          </Typography>
          <Typography className={style.productDetails_Discount}>
            ({item?.discount}% OFF)
          </Typography>
        </div>
        <Typography className={style.productDetails_taxfont}>
          inclusive of all taxes
        </Typography>
        <Button
          className={style.productDetails_rating}
          startIcon={<StarIcon />}
        >
          {item?.rating}
        </Button>
        <Divider />
        <Typography>More colors</Typography>
        <div className={style.productDetails_colorBtn}>
          {item?.multipleColorImage?.map((val: any) => {
            return (
              <button>
                {<img src={val?.productImage} alt={val?.color} />}
              </button>
            );
          })}
        </div>
        <Typography className={style.productDetails_normalFont}>
          Select size{" "}
        </Typography>
        <div className={style.productDetails_sizeBtn}>
          {item?.size?.map((val: any, index: number) => {
            return (
              <button key={index} onClick={() => handleSizeClick(val)}>
                {val?.productSize}
              </button>
            );
          })}
        </div>

        <div className={style.productDetails_BuyBtn}>
          <Button
            className={style.productDetails_cartBtn}
            onClick={() =>
              dispatch(
                addCartAction({
                  userId: userId,
                  productId: productId,
                  size: productSize,
                })
              )
            }
          >
            ADD TO CART
          </Button>
          <Button className={style.productDetails_wishBtn}>BUY NOW</Button>
        </div>
        <Typography>
          Easy returns upto 7 days of delivery. Exchange available on select
          pincodes
        </Typography>
        <div className={style.productDetails_offers_desc}>
          <img src={offers} height={23} width={23} />
          <Typography className={style.productDetails_normalFont}>
            Offers
          </Typography>
        </div>
        {item?.offer?.map((val: any) => {
          return (
            <Typography className={style.productDetails_offers_desc_details}>
              {val?.productOffer}
            </Typography>
          );
        })}
        <div className={style.productDetails_offers_desc}>
          <Description />
          <Typography className={style.productDetails_normalFont}>
            Description
          </Typography>
        </div>

        {item?.description?.map((val: any) => {
          return (
            <Typography className={style.productDetails_offers_desc_details}>
              {val?.productDescription}
            </Typography>
          );
        })}

        {/* <Typography>
          100% SECURE PAYMENTS offer EASY RETURNS & INSTANT REFUNDS offer
          SHIPPING GLOBALL
        </Typography> */}
      </div>
    </div>
  );
};
