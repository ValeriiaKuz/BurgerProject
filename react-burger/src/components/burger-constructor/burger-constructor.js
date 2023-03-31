import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor.module.css'

const BurgerCostructor = (props) => {
    let bunElementTop = props.addedIngredients.map((ingedient,index) => {
        if(ingedient.type==='bun'){
            return <ConstructorElement key = {index} type = 'top' isLocked = {true}
                                       text = {ingedient.name + '  (верх)'}
                                       price = {ingedient.price}
                                       thumbnail = {ingedient.image} />
        }})
    let sauceAndMain = props.addedIngredients.map((ingedient,index) => {
        if(ingedient.type !== 'bun'){
            return <div className = {style.withIcon}>
                <DragIcon type = 'primary'/>
                <ConstructorElement key = {index} text = {ingedient.name}
                                    price = {ingedient.price}
                                    thumbnail = {ingedient.image}/>
            </div>
        }}
    )
    let bunElementBottom = props.addedIngredients.map((ingedient, index) => {
        if(ingedient.type === 'bun'){
            return <ConstructorElement key = {index} type = 'bottom' isLocked = {true}
                                       text = {ingedient.name + '  (верх)'}
                                       price = {ingedient.price}
                                       thumbnail = {ingedient.image}/>
        }})

    return (
        <div className = {style.wrapper + ' ' + style.customScroll}>
            <div  className = {style.addedIngredients + ' ' + 'pr-4'}>
                {bunElementTop}
                {sauceAndMain}
                {bunElementBottom}
            </div>
        </div>
    )
}
export default BurgerCostructor