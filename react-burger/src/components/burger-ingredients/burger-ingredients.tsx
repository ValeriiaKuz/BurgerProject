import style from "./burger-ingredients.module.css";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import TypeOfIngredients from "./type-of-ingredients/type-of-ingredients";
import { useSelector } from "../../utils/hooks/hooks";
export enum TabType {
  bun = "Булки",
  sauces = "Соусы",
  main = "Начинки",
}
const BurgerIngredients: FC = () => {
  const [tabId, setTabId] = useState<TabType>(TabType.bun);
  const ingredientsData = useSelector(
    (store) => store.ingredients.ingredientsData
  );
  useEffect(() => {
    document
      .getElementById(tabId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Array<HTMLDivElement>>([]);

  useEffect(() => {
    const callback = (entries: Array<IntersectionObserverEntry>) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setTabId(entry.target.id as TabType);
        }
      });
    };
    const options = {
      root: wrapperRef.current,
      rootMargin: "0px 0px -90% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(callback, options);

    sectionsRef.current.forEach((section: HTMLDivElement) => {
      observer.observe(section);
    });
  }, []);

  return (
    <div className={style.wrapper}>
      <IngredientsTab setTabId={setTabId} tabId={tabId} />
      <div
        className={`${style.cardsWrapper} ${style.customScroll}`}
        ref={wrapperRef}
      >
        <div
          id={TabType.bun}
          ref={(el) => (sectionsRef.current[0] = el as HTMLDivElement)}
        >
          <TypeOfIngredients header={TabType.bun} ingredients={buns} />
        </div>
        <div
          id={TabType.sauces}
          ref={(el) => (sectionsRef.current[1] = el as HTMLDivElement)}
        >
          <TypeOfIngredients header={TabType.sauces} ingredients={sauces} />
        </div>
        <div
          id={TabType.main}
          ref={(el) => (sectionsRef.current[2] = el as HTMLDivElement)}
        >
          <TypeOfIngredients header={TabType.main} ingredients={mains} />
        </div>
      </div>
    </div>
  );
};
export default BurgerIngredients;
