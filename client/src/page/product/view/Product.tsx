import React, { useState } from "react";
import style from "./Product.module.scss";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/img1.jpg";
import { useNavigate } from "react-router-dom";
// import img2 from "../../assets/img2.jpg";
interface ProductProps {
  item: any[];
}

var items = [
  {
    name: "Random Name #1",
    description: "1 - Probably the most random thing you have ever seen!",
  },
  {
    name: "Random Name #2",
    description: "2- Hello World!",
  },
  {
    name: "Random Name #3",
    description: "3 - Hello World!",
  },
];

export const Product = (props: ProductProps) => {
  const { item } = props;
  const navigate = useNavigate();
  console.log("item: ", item);
  const [hoveredCard, setHoveredCard] = useState<number>();

  return (
    <Box sx={{ flexGrow: 1 }} className={style.ProductBody}>
      {item &&
        item.map((val, index) => {
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(val?._id)}
              onMouseLeave={() => setHoveredCard(undefined)}
              onClick={() => navigate(`/product/${val?._id}`)}
            >
              <Card sx={{ height: "350px" }}>
                <Carousel autoPlay={val?._id === hoveredCard}>
                  {items.map((item, i) => (
                    <div key={i}>
                      <div className={style.card_wrapper}>
                        <CardMedia
                          component="img"
                          alt="product image"
                          height="230"
                          src={img1}
                        />
                      </div>
                      <CardContent className={style.productList_info}>
                        <Typography variant="h5" component="div">
                          {val.companyName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {val?.productName}
                        </Typography>
                        <div className={style.productList_price}>
                          <Typography variant="h5" component="span">
                            Rs. {val?.offerPrice}
                          </Typography>
                          <div>
                            <Typography variant="body2" color="text.secondary">
                              Rs. {val?.cancelledprice}
                            </Typography>
                          </div>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className={style.productList_discount}
                          >
                            ({val?.discount}% OFF)
                          </Typography>
                        </div>
                      </CardContent>
                    </div>
                  ))}
                </Carousel>
              </Card>
            </div>
            // <Card sx={{ height: "350px" }}>
            //   <CardMedia
            //     component="img"
            //     alt="green iguana"
            //     height="230"
            //     src={val?.image}
            //   />
            //   <CardContent>
            //     <Typography gutterBottom variant="h5" component="div">
            //       {val.companyName}
            //     </Typography>
            //     <Typography variant="body2" color="text.secondary">
            //       {val?.item}
            //     </Typography>
            //     <Typography variant="body2" color="text.secondary">
            //       Rs. {val?.amount}
            //     </Typography>
            //   </CardContent>
            // </Card>
          );
        })}
    </Box>
  );
};
