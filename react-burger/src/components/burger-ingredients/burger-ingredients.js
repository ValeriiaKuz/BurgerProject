import style from "./burger-ingredients.module.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import TypeOfIngredients from "./type-of-ingredients/type-of-ingredients";
import { useSelector } from "react-redux";
const BurgerIngredients = () => {
  const [tabId, getTabId] = useState("Булки");
  const ingredientsData = useSelector(
    (store) => store.ingredients.ingredientsData
  );
  useEffect(() => {
    document
      .getElementById(tabId)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, [tabId]);

  const { sauces, buns, mains } = useMemo(() => {
    const sauces = ingredientsData.filter(
      (ingredient) => ingredient.type === "sauce"
    );
    const buns = ingredientsData.filter(
      (ingredient) => ingredient.type === "bun"
    );
    const mains = ingredientsData.filter(
      (ingredient) => ingredient.type === "main"
    );
    return { sauces, buns, mains };
  }, [ingredientsData]);

  const wrapperRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getTabId(entry.target.id);
        }
      });
    };
    const options = {
      root: wrapperRef.current,
      rootMargin: "0px 0px -90% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(callback, options);

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });
  }, []);

  return (
    <div className={style.wrapper}>
      <IngredientsTab getTabId={getTabId} tabId={tabId} />
      <div
        className={`${style.cardsWrapper} ${style.customScroll}`}
        ref={wrapperRef}
      >
        <div id="Булки" ref={(el) => (sectionsRef.current[0] = el)}>
          <TypeOfIngredients header="Булки" ingredients={buns} />
        </div>
        <div id="Соусы" ref={(el) => (sectionsRef.current[1] = el)}>
          <TypeOfIngredients header="Соусы" ingredients={sauces} />
        </div>
        <div id="Начинки" ref={(el) => (sectionsRef.current[2] = el)}>
          <TypeOfIngredients header="Начинки" ingredients={mains} />
        </div>
      </div>
    </div>
  );
};
export default BurgerIngredients;
