import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderComponent } from "./component/header/HeaderComponent";
import { Index } from "./page/login/LoginComponent";
import { getStorage } from "./utils/Auth/Auth";
import { useAppDispatch } from "./Store";
import { refreshAction } from "./page/refreshSession/RefreshSession.Reducer";

interface privateRouteProps {
  children: any;
}

export const PrivateRoute = (props: privateRouteProps) => {
  const isAuthorized = getStorage("userAUTHToken");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    } else {
      dispatch(refreshAction());
    }
  }, [isAuthorized]);

  return (
    <>
      {!isAuthorized ? (
        <Index />
      ) : (
        <>
          <HeaderComponent />
          <div>{props.children}</div>
        </>
      )}
    </>
  );
};
