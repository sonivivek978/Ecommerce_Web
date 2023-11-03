import React from "react";
import { DashboardView } from "./view/DashboardView";
import product from "../../assets/background.jpg";
import product1 from "../../assets/img2.jpg";
const DashboardViewData = [
  { image: product },
  { image: product1 },
  { image: product },
  { image: product },
];

export const DashboardComponent = () => {
  return (
    <div>
      <DashboardView item={DashboardViewData} />
    </div>
  );
};
