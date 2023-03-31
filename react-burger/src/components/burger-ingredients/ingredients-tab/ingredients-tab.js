import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientsTab = (props) => {
    const [current, setCurrent] = React.useState('Булки')
    return (
        <div style = {{ display:'flex'}}>
            <Tab value = "Булки" active = {current === 'Булки'} onClick = {() => {setCurrent('Булки'); props.getTabId("Булки")}}>
                Булки
            </Tab>
            <Tab value = "Соусы" active = {current === 'Соусы'} onClick = {() => {setCurrent('Соусы'); props.getTabId("Соусы")}}>
                Соусы
            </Tab>
            <Tab value = "Начинки" active = {current === 'Начинки'} onClick = {() => {setCurrent('Начинки'); props.getTabId("Начинки")}}>
                Начинки
            </Tab>
        </div>
    )}
export default IngredientsTab