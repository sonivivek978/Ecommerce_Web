import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
interface DashboardViewProps {
  item?: any[];
}
export const DashboardView = (props: DashboardViewProps) => {
  const { item } = props;
  const navigate = useNavigate();

  return (
    <div>
      <Carousel autoPlay={true} interval={3000} showThumbs={false}>
        {item?.map((val) => {
          return (
            <div onClick={() => navigate("/product")}>
              <img src={val?.image} height={450} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
