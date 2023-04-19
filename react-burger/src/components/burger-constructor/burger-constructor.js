import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addIngredientAC,
  DELETE_INGREDIENT,
} from "../../services/actions/add-ingredient";

const BurgerConstructor = () => {
  const addedIngredients = useSelector(
    (store) => store.addedIngredients.addedIngredients
  );

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

  const deleteIngredient = (id) => {
    dispatch({ type: DELETE_INGREDIENT, id: id });
  };
  const sauceAndMain = addedIngredients.map((ingredient, index) => {
    if (ingredient.type !== "bun") {
      return (
        <div className={style.withIcon} key={index}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => {
              deleteIngredient(ingredient.id);
            }}
          />
        </div>
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
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addIngredientAC(item.ingredient));
    },
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
