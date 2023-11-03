import React, { useEffect, useState } from "react";
import { Product } from "./view/Product";
import image from "../../assets/background.jpg";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/user.jpg";
import { FilterComponent } from "./filter/FilterComponent";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { useAppDispatch } from "../../Store";
import { getProductAction } from "./ProductComponent.Reducer";
import { useSelector } from "react-redux";

const ProductData = [
  {
    id: 1,
    companyName: "Lee",
    item: "Product sm-1",
    amount: "499",
    image: img1,
  },
  {
    id: 2,
    companyName: "Lee",
    item: "Product xl-2",
    amount: "500",
    image: img4,
  },
  {
    id: 3,
    companyName: "Lee",
    item: "Product m-3",
    amount: "500",
    image: img2,
  },
  {
    id: 4,
    companyName: "Lee",
    item: "Product lg-4",
    amount: "580",
    image: image,
  },
  {
    id: 5,
    companyName: "Lee",
    item: "slim Fit Casual Shirt",
    amount: "499",
    image: image,
  },
  {
    id: 6,
    companyName: "Lee",
    item: "slim Fit Casual Shirt",
    amount: "679",
    image: image,
  },
];
export const ProductComponent = () => {
  const dispatch = useAppDispatch();
  const { product } = useSelector((data: any) => data);
  console.log("data: ", product?.data?.data);
  const ProductList = product?.data?.data;
  const [sortProduct, setSortProduct] = useState("relevance");
  const handleChange = (event: { target: { value: string } }) => {
    setSortProduct(event.target.value);
  };
  useEffect(() => {
    dispatch(getProductAction());
  }, []);
  return (
    <Box sx={{ width: "97%", margin: "20px" }}>
      <Grid container rowSpacing={1}>
        <Grid item xs={2}>
          <FilterComponent />
        </Grid>
        <Grid item xs={10}>
          <Card sx={{ margin: "0px 10px 10px 10px", height: "60px" }}>
            <CardContent sx={{ textAlign: "end" }}>
              <FormControl sx={{ textAlign: "left" }}>
                <Select
                  value={sortProduct}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    width: 250,
                    minWidth: 120,
                    height: "30px",
                    maxHeight: "35px",
                  }}
                >
                  <MenuItem value={"highest"}>Price (Highest first)</MenuItem>
                  <MenuItem value={"discount"}>Discount</MenuItem>
                  <MenuItem value={"lowest"}>Price (Lowest first)</MenuItem>
                  <MenuItem value={"Whatsnew"}>What's new</MenuItem>
                  <MenuItem value={"relevance"}>Relevance</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          <Product item={ProductList} />
        </Grid>
      </Grid>
    </Box>
  );
};
