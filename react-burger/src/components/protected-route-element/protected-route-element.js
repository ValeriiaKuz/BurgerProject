import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element, withAuth }) => {
  const isUser = useSelector((store) => store.auth.isUser);
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
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  withAuth: PropTypes.bool.isRequired,
};
