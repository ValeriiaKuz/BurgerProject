import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../services/actions/auth";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element }) => {
  const { email, name } = useSelector((store) => store.auth.user);
  const isLoadingUser = useSelector((store) => store.auth.isLoadingUser);
  const isUser = useSelector((store) => store.auth.isUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email || !name) {
      dispatch(getUser());
    }
  }, [dispatch, email, name]);

  if (isLoadingUser) {
    return <span>Loading</span>;
  }
  if (!isUser) {
    return <Navigate to="/login" replace />;
  }
  if (email && name) {
    return element;
  }
};
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};
