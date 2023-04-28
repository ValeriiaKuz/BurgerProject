import React, { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import ComponentWrapper from "../main-components-wrapper/component-wrapper";
import style from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
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

const App = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const { isLoading, isError } = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsData());
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
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
        </Routes>
      )}
    </div>
  );
};
export default App;
