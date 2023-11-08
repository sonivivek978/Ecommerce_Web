import { Route, Routes } from "react-router-dom";
import { Message } from "./page/message/index";
import { Index } from "./page/login/LoginComponent";
import { RegisterComponent } from "./page/register/RegisterComponent";
import { ProductComponent } from "./page/product/Product.Component";
import { DashboardComponent } from "./page/dashboard/DashboardComponent";
import { ProductDetailsComponent } from "./page/product/ProductDetails.Component";
import { NotFound } from "./component/not_found/NotFound";
import { PrivateRoute } from "./ProtectedRoutes";
import { CartComponent } from "./page/product/Cart.Component";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Index />} />
        <Route path="/register" element={<RegisterComponent />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <ProductComponent />
            </PrivateRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetailsComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/cart"
          element={
            <PrivateRoute>
              <CartComponent />
            </PrivateRoute>
          }
        />

        <Route
          path="/msg"
          element={
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          }
        />
        <Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
