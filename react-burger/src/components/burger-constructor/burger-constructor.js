import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addIngredientAC,
  DELETE_INGREDIENT,
} from "../../services/actions/add-ingredient";
import MainSauceElement from "./main-sauce-element/main-sauce-element";
import { useCallback, useEffect, useState } from "react";

const BurgerConstructor = () => {
  const addedIngredients = useSelector(
    (store) => store.addedIngredients.addedIngredients
  );
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addIngredientAC(item.ingredient));
    },
  });
  const deleteIngredient = (id) => {
    dispatch({ type: DELETE_INGREDIENT, id: id });
  };

  const bunElementTop = addedIngredients.map((ingredient) => {
    if (ingredient.type === "bun") {
      return (
        <ConstructorElement
          key={ingredient._id}
          type="top"
          isLocked={true}
          text={ingredient.name + "  (верх)"}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      );
    }
  });

  const [ingredients, setIngredients] = useState(addedIngredients);
  useEffect(() => {
    setIngredients(addedIngredients);
  }, [addedIngredients]);

  const moveListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = ingredients[dragIndex];
      const hoverItem = ingredients[hoverIndex];

      setIngredients((ingredients) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[dragIndex] = hoverItem;
        updatedIngredients[hoverIndex] = dragItem;
        return updatedIngredients;
      });
    },
    [ingredients]
  );
  const sauceAndMain = ingredients.map((ingredient, index) => {
    if (ingredient.type !== "bun") {
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
  });
  const bunElementBottom = addedIngredients.map((ingredient) => {
    if (ingredient.type === "bun") {
      return (
        <ConstructorElement
          key={ingredient._id}
          type="bottom"
          isLocked={true}
          text={ingredient.name + "  (низ)"}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      );
    }
  });

  return (
    <div className={style.constructorWrapper} ref={dropRef}>
      <div className={`${style.bunWrapper} mt-4 mb-4`}>{bunElementTop}</div>
      <div className={`${style.wrapper} ${style.customScroll}`}>
        <div className={`${style.addedIngredients} pr-4`}>{sauceAndMain}</div>
      </div>
      <div className={`${style.bunWrapper} mt-4`}>{bunElementBottom}</div>
    </div>
  );
};

export default BurgerConstructor;
