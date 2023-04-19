import React, { useState } from "react";
import style from "./component-wrapper.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderPrice from "../burger-constructor/order-price/order-price";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../burger-constructor/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
} from "../../services/actions/order-number";
import { PUBLIC_URL } from "../../utils/API";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ComponentWrapper = () => {
  const addedIngredients = useSelector(
    (store) => store.addedIngredients.addedIngredients
  );
  const { isLoading, isError } = useSelector((store) => store.orderNumber);
  const dispatch = useDispatch();
  const getOrderNumber = () => {
    let idArray = [];
    for (let i = 0; i < addedIngredients.length; i++) {
      idArray.push(addedIngredients[i]._id);
    }
    return function (dispatch) {
      dispatch({
        type: GET_ORDER_NUMBER,
      });
      fetch(`${PUBLIC_URL}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          ingredients: idArray,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Ошибка запроса ${res.status}`);
          else return res.json();
        })
        .then((res) => {
          if (res && res.success) {
            dispatch({
              type: GET_ORDER_NUMBER_SUCCESS,
              orderNumber: res.order.number,
            });
          } else {
            dispatch({
              type: GET_ORDER_NUMBER_FAILED,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
          dispatch({
            type: GET_ORDER_NUMBER_FAILED,
          });
        });
    };
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
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
                handleOpenModal();
                dispatch(getOrderNumber());
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
