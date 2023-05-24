import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";
type ProtectedRouteElementType = {
  element: JSX.Element;
  withAuth: boolean;
};
export const ProtectedRouteElement: FC<ProtectedRouteElementType> = ({
  element,
  withAuth,
}) => {
  const isUser: boolean = useSelector((store: any) => store.auth.isUser);
  const location = useLocation();

  if (withAuth) {
    return !isUser ? (
      <Navigate to="/login" replace state={{ from: location }} />
    ) : (
      element
    );
  } else {
    return isUser ? (
      <Navigate to={location.state?.from || "/"} replace />
    ) : (
      element
    );
  }
};
