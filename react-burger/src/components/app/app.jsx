import React, { useEffect, useMemo, useState } from "react";
import AppHeader from "../app-header/app-header";
import ComponentWrapper from "../main-components-wrapper/component-wrapper";
import style from "./app.module.css";
import { IngredientsContext } from "../../services/ingredients-context";

const App = () => {
  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const [ingredientsData, setIngredientsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getIngredientsData = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error(`Ошибка запроса ${res.status}`);
        }
        const data = await res.json();
        setIngredientsData(data.data);
      } catch (err) {
        console.log(err.message);
        alert(err.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getIngredientsData();
  }, []);

  const value = useMemo(() => {
    return { ingredientsData };
  }, [ingredientsData]);
  return (
    <div className={style.wrapper}>
      <AppHeader />
      {isLoading && <span> Загрузка </span>}
      {isError && <span> Ошибка: что-то пошло не так. </span>}
      <IngredientsContext.Provider value={value}>
        {!isLoading && !isError && <ComponentWrapper />}
      </IngredientsContext.Provider>
    </div>
  );
};
export default App;
