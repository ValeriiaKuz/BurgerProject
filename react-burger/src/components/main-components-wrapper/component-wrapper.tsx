import React, { FC, useState } from "react";
import style from "./component-wrapper.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderPrice from "../burger-constructor/order-price/order-price";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../burger-constructor/order-details/order-details";
import { getOrderNumber } from "../../services/actions/order-number";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { TIngredientWithID } from "../../utils/types/ingredient-types";
import { useDispatch, useSelector } from "../../utils/hooks/hooks";

const ComponentWrapper: FC = () => {
  const addedIngredients: Array<TIngredientWithID> = useSelector(
    (store) => store.addedIngredients.addedIngredients
  );
  const { isLoading, isError } = useSelector((store) => store.orderNumber);
  const isUser = useSelector((store) => store.auth.isUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOrderClick = (): void => {
    const idArray: Array<string> = [
      ...addedIngredients.map(
        (ingredient: TIngredientWithID) => ingredient._id
      ),
      addedIngredients[0]._id,
    ];
    dispatch(getOrderNumber(idArray));
  };
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleOpenModal = (): void => {
    handleOrderClick();
    setIsOpenModal(true);
  };
  const handleCloseModal = (): void => {
    setIsOpenModal(false);
  };
  return (
    <main>
      <h1 className="text text_type_main-large mt-5 mb-5">Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
        <section className={style.ingredients}>
          <BurgerIngredients />
        </section>
        <section className={style.order}>
          <BurgerConstructor />
          <div className={style.orderPrice + " " + "pr-4 pt-10"}>
            <OrderPrice />
            <Button
              onClick={() => {
                isUser ? handleOpenModal() : navigate("/login");
              }}
              disabled={
                !addedIngredients.find(
                  (i: TIngredientWithID) => i.type === "bun"
                ) ||
                !addedIngredients.find(
                  (i: TIngredientWithID) => i.type !== "bun"
                )
              }
              htmlType="button"
              type="primary"
              size="medium"
            >
              Оформить заказ
            </Button>
            {isOpenModal && (
              <Modal onClose={handleCloseModal}>
                <div>
                  {isError && (
                    <div className="m-5"> Ошибка: что-то пошло не так.</div>
                  )}
                  {isLoading && <div className="m-5"> Загрузка</div>}
                  {!isError && !isLoading && <OrderDetails />}
                </div>
              </Modal>
            )}
          </div>
        </section>
      </DndProvider>
    </main>
  );
};
export default ComponentWrapper;
