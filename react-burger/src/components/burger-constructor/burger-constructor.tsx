import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "../../utils/hooks/hooks";
import { useDrop } from "react-dnd";
import { addIngredientAC } from "../../services/actions/add-ingredient";
import MainSauceElement from "./main-sauce-element/main-sauce-element";
import React, { FC, useCallback, useMemo } from "react";
import {
  TIngredient,
  TIngredientWithID,
} from "../../utils/types/ingredient-types";
import {
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../../services/constants/constants";

const BurgerConstructor: FC = () => {
  type TIngredients = {
    bun: TIngredientWithID | undefined;
    ingredients: Array<TIngredientWithID>;
  };
  const addedIngredients = useSelector(
    (store) => store.addedIngredients.addedIngredients
  );
  const { bun, ingredients }: TIngredients = useMemo(() => {
    const bun = addedIngredients.find(
      (item: TIngredientWithID) => item.type === "bun"
    );
    const ingredients = addedIngredients.filter(
      (item: TIngredientWithID) => item.type !== "bun"
    );
    return { bun, ingredients };
  }, [addedIngredients]);
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item: { ingredient: TIngredient }) => {
      dispatch(addIngredientAC(item.ingredient));
    },
  });
  const deleteIngredient = (id: string): void => {
    dispatch({ type: DELETE_INGREDIENT, id: id });
  };
  const moveListItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = ingredients[dragIndex];
      const hoverItem = ingredients[hoverIndex];
      const updatedIngredients = [...ingredients];
      updatedIngredients[dragIndex] = hoverItem;
      updatedIngredients[hoverIndex] = dragItem;
      dispatch({
        type: SORT_INGREDIENTS,
        bun: bun ? bun : null,
        ingredients: updatedIngredients,
      });
    },
    [bun, ingredients, dispatch]
  );
  const sauceAndMain = ingredients.map(
    (ingredient: TIngredientWithID, index: number) => {
      return (
        <MainSauceElement
          ingredient={ingredient}
          deleteIngredient={deleteIngredient}
          key={ingredient.id}
          index={index}
          moveListItem={moveListItem}
        />
      );
    }
  );
  return (
    <div
      className={style.constructorWrapper}
      ref={dropRef}
      data-testid="drop-area"
    >
      <div className={`${style.bunWrapper} mt-4 mb-4`}>
        {bun && (
          <ConstructorElement
            key={bun._id}
            type="top"
            isLocked={true}
            text={bun.name + "  (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      <div className={`${style.wrapper} ${style.customScroll}`}>
        <div className={`${style.addedIngredients} pr-4`}>{sauceAndMain}</div>
      </div>
      <div className={`${style.bunWrapper} mt-4`}>
        {bun && (
          <ConstructorElement
            key={bun._id}
            type="bottom"
            isLocked={true}
            text={bun.name + "  (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
    </div>
  );
};
export default BurgerConstructor;
