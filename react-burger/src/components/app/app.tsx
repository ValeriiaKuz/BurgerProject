import React, { FC, useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import ComponentWrapper from "../main-components-wrapper/component-wrapper";
import style from "./app.module.css";
import { useDispatch, useSelector } from "../../utils/hooks/hooks";
import { getIngredientsData } from "../../services/actions/get-ingredients";
import { Route, Routes, useLocation } from "react-router-dom";
import Feed from "../../pages/feed/feed";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Profile from "../../pages/profile/profile";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password /reset-password";
import { ProfileInputs } from "../../pages/profile/profile-inputs/profile-inputs";
import { ProfileOrders } from "../../pages/profile/profile-orders/profile-orders";
import { getUser } from "../../services/actions/auth";
import { LogOut } from "../../pages/logout/logout";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import { OrderInfo } from "../../pages/feed/order-info/order-info";
const App: FC = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setIsOpenModal(false);
  };
  const { isLoading, isError }: { isLoading: boolean; isError: boolean } =
    useSelector((store) => store.ingredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsData());
    dispatch(getUser());
  }, []);
  return (
    <div className={style.wrapper}>
      <AppHeader />
      {isLoading && <span> Загрузка </span>}
      {isError && <span> Ошибка: что-то пошло не так. </span>}
      <Routes location={background || location}>
        <Route
          path="/"
          element={!isLoading && !isError && <ComponentWrapper />}
        />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement withAuth={false} element={<Login />} />
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement withAuth={false} element={<Register />} />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement
              withAuth={false}
              element={<ForgotPassword />}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement
              withAuth={false}
              element={<ResetPassword />}
            />
          }
        />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/feed/:id"
          element={
            <Modal onClose={handleCloseModal} children={<OrderInfo />} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement withAuth={true} element={<Profile />} />
          }
        >
          <Route path="" element={<ProfileInputs />} />
          <Route path="orders" element={<ProfileOrders />} />
          <Route path="orders/:id" element={<OrderInfo />} />
          <Route path="logout" element={<LogOut />} />
        </Route>
        <Route
          path="/ingredients/:id"
          element={
            <Modal
              onClose={handleCloseModal}
              header={"Детали ингредиента"}
              children={<IngredientDetails />}
            />
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                onClose={handleCloseModal}
                header={"Детали ингредиента"}
                children={<IngredientDetails />}
              />
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleCloseModal} children={<OrderInfo />} />
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleCloseModal} children={<OrderInfo />} />
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
