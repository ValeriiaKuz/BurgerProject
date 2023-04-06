import React, {useState} from "react";
import style from './component-wrapper.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderPrice from "../order-price/order-price";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/propTypes";

const ComponentWrapper = (props) => {
    const [addedIngredients, getAddedIngredients] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const handleOpenModal = () => {
        setIsOpenModal(true)
    }
    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    return (
        <main>
            <h1 className="text text_type_main-large mt-5 mb-5">Соберите бургер</h1>
            <section className={style.ingredients}>
                <BurgerIngredients ingredientsData={props.ingredientsData} getAddedIngredients={getAddedIngredients}
                                   addedIngredients={addedIngredients}/>
            </section>
            <section className={style.order}>
                <BurgerConstructor addedIngredients={addedIngredients}/>
                <div className={style.orderPrice + ' ' + 'pr-4 pt-10'}>
                    <OrderPrice addedIngredients={addedIngredients}/>
                    <Button onClick={handleOpenModal} htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                    {isOpenModal &&
                        <Modal onClose={handleCloseModal}>
                            <OrderDetails/>
                        </Modal>}
                </div>
            </section>
        </main>
    )
}

ComponentWrapper.propTypes = {
    ingredientsData:PropTypes.arrayOf(ingredientPropTypes).isRequired
}
export default ComponentWrapper