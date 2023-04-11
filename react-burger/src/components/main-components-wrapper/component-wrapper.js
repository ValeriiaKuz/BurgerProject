import React, { useReducer, useState } from "react";
import style from "./component-wrapper.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderPrice from "../burger-constructor/order-price/order-price";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../burger-constructor/order-details/order-details";

const ComponentWrapper = () => {
  const [addedIngredients, getAddedIngredients] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const orderPriceInitialState = { orderPrice: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case "bun":
        return { orderPrice: state.orderPrice + action.ingredient.price * 2 };
      case "another":
        return { orderPrice: state.orderPrice + action.ingredient.price };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [orderPriceState, orderPriceDispatcher] = useReducer(
    reducer,
    orderPriceInitialState,
    undefined
  );
  const [orderID, setOrderId] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getOrderId = async () => {
    let idArray = [];
    for (let i = 0; i < addedIngredients.length; i++) {
      idArray.push(addedIngredients[i]._id);
    }
    try {
      let res = await fetch("https://norma.nomoreparties.space/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          ingredients: idArray,
        }),
      });
      if (!res.ok) {
        throw new Error(`Ошибка запроса ${res.status}`);
      }
      let result = await res.json();
      setOrderId(result.order.number);
      setIsError(false);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1 className="text text_type_main-large mt-5 mb-5">Соберите бургер</h1>
      <section className={style.ingredients}>
        <BurgerIngredients
          getAddedIngredients={getAddedIngredients}
          orderPriceDispatcher={orderPriceDispatcher}
        />
      </section>
      <section className={style.order}>
        <BurgerConstructor addedIngredients={addedIngredients} />
        <div className={style.orderPrice + " " + "pr-4 pt-10"}>
          <OrderPrice orderPrice={orderPriceState.orderPrice} />
          <Button
            onClick={() => {
              handleOpenModal();
              setOrderId(null);
              getOrderId();
            }}
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
                {!isError && !isLoading && orderID && (
                  <OrderDetails orderID={orderID} />
                )}
              </div>
            </Modal>
          )}
        </div>
      </section>
    </main>
  );
};

export default ComponentWrapper;
