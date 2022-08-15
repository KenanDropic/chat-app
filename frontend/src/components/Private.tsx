import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { Roles } from "./interfaces/interfaces";
import Spinner from "./Spinner";

// @ts-ignore comment
const Private: React.FC<Roles> = ({ allowedRoles }) => {
  const location = useLocation();
  const { data, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading) {
    return data && allowedRoles.includes(data?.role) ? (
      <Outlet />
    ) : data ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }
};

export default Private;
