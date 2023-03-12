import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const [loader, setLoader] = useState(true);
  const { user } = useSelector((state) => state.Login);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setTimeout(() => {
        return setLoader(false);
      }, 100);
    } else {
      return setLoader(false);
    }
  }, [user]);

  if (!loader) {
    return user.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
