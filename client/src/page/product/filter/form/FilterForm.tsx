import React from "react";
import style from "./FilterForm.module.scss";
import { Box, Card, CardContent, Typography } from "@mui/material";
export const FilterForm = () => {
  return (
    <Box>
      <Card sx={{ height: "635px" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "emoji", color: "gray", margin: "20PX" }}
          >
            {/* Filter-1 */}
            Appointment
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "emoji", color: "gray", margin: "20PX" }}
          >
            {/* Filter-2 */}
            Claim
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "emoji", color: "gray", margin: "20PX" }}
          >
            {/* Filter-3 */}
            Product
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "emoji", color: "gray", margin: "20PX" }}
          >
            {/* Filter-3 */}
            Product-1
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "emoji", color: "gray", margin: "20PX" }}
          >
            {/* Filter-3 */}
            Product-2
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
