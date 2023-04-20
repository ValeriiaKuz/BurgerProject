import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import ComponentWrapper from "../main-components-wrapper/component-wrapper";
import style from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/get-ingredients";

const App = () => {
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
      {!isLoading && !isError && <ComponentWrapper />}
    </div>
  );
};
export default App;
