import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import ComponentWrapper from "../main-components-wrapper/component-wrapper";
import style from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_INGREDIENTS_DATA,
  GET_INGREDIENTS_DATA_FAILED,
  GET_INGREDIENTS_DATA_SUCCESS,
} from "../../services/actions/get-ingredients";
import { PUBLIC_URL } from "../../utils/API";

const App = () => {
  const getIngredientsData = () => {
    return function (dispatch) {
      dispatch({
        type: GET_INGREDIENTS_DATA,
      });
      fetch(`${PUBLIC_URL}ingredients`)
        .then((res) => {
          if (!res.ok) throw new Error(`Ошибка запроса ${res.status}`);
          else return res.json();
        })
        .then((res) => {
          if (res && res.success) {
            dispatch({
              type: GET_INGREDIENTS_DATA_SUCCESS,
              ingredientsData: res.data,
            });
          } else {
            dispatch({
              type: GET_INGREDIENTS_DATA_FAILED,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
          dispatch({
            type: GET_INGREDIENTS_DATA_FAILED,
          });
        });
    };
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
      {!isLoading && !isError && <ComponentWrapper />}
    </div>
  );
};
export default App;
