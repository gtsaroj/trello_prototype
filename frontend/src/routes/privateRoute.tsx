import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "@/store";
import { useEffect } from "react";

interface PrivateRouteProp {
  userRole: Auth.UserType[];
}

export const PrivateRoute: React.FC<PrivateRouteProp> = ({ userRole }) => {
  const location = useLocation();

  const auth = useSelector((state: RootState) => state.root.user);

  console.log("flksdjl")

  useEffect(() => {}, [auth.data, auth.isSuccess]);

  return auth.isSuccess ? (
    userRole.includes(auth.data.role as Auth.UserType) ? (
      <Outlet />
    ) : (
      <div>Unauthorized Access</div>
    )
  ) : (
    <Navigate to={"/"} state={location} replace></Navigate>
  );
};
