import orderDoneImg from "../../../images/orderDone.svg";
import React from "react";
import style from "./order-details.module.css";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const orderNumber = useSelector((store) => store.orderNumber.orderNumber);
  return (
    <div className={`ml-30 mr-30 mb-30 ${style.contentWrapper}`}>
      <p className={`text text_type_digits-large mb-8 ${style.orderNumber}`}>
        {orderNumber}
      </p>
      <h3 className="text text_type_main-medium mb-15">
        {" "}
        идентификатор заказа{" "}
      </h3>
      <img src={orderDoneImg} alt={"Заказ сделан"} className=" mb-15" />
      <div className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </div>
      <div className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};
export default OrderDetails;
