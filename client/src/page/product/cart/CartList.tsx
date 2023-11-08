import React from "react";
import style from "./CartList.module.scss";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
interface cartListProps {
  item: any;
  isLoading: boolean;
  error: string;
}
export const CartList = (props: cartListProps) => {
  const { item, isLoading, error } = props;
  return (
    <>
      {!isLoading ? (
        <>
          <div className={style.CartListLeftPart}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Address section
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            {item &&
              item?.cartProduct?.length > 0 &&
              item?.cartProduct?.map((val: any) => {
                {
                  return (
                    <Card sx={{ minWidth: 275 }} className={style.CartListProductCard}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Address section
                        </Typography>

                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          adjective
                        </Typography>
                        <Typography variant="body2">
                          well meaning and kindly.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  );
                }
              })}
          </div>
          <div>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  payment
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
