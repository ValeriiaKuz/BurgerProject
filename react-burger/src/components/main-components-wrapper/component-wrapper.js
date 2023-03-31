import React, {useState} from "react";
import style from './component-wrapper.module.css'
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderPrice from "../order-price/order-price";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerCostructor from "../burger-constructor/burger-constructor";

const ingredientsData = require('../../utils/data.json')
const ComponentWrapper = () => {
    const[addedIngredients,getAddedIngredients]=useState([])
    return(
        <main>
            <h1 className="text text_type_main-large mt-5 mb-5">Соберите бургер</h1>
            <section className={style.ingredients}>
                <BurgerIngredients ingredientsData={ingredientsData} getAddedIngredients={getAddedIngredients} addedIngredients={addedIngredients}/>
            </section>
            <section className={style.order}>
                <BurgerCostructor addedIngredients={addedIngredients} />
                <div className={style.orderPrice+' '+ 'pr-4 pt-10'} >
                    <OrderPrice addedIngredients={addedIngredients}/>
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </section>
        </main>
    )
}
export default ComponentWrapper