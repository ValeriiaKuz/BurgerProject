import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './burger-constructor.module.css'
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/propTypes";


const BurgerConstructor = (props) => {
    const bunElementTop = props.addedIngredients.map((ingredient, index) => {
        if (ingredient.type === 'bun') {
            return (
                <ConstructorElement key={index} type='top' isLocked={true}
                                    text={ingredient.name + '  (верх)'}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}/>
            )
        }
    })
    const sauceAndMain = props.addedIngredients.map((ingredient, index) => {
            if (ingredient.type !== 'bun') {
                return (
                    <div className={style.withIcon} key={index}>
                        <DragIcon type='primary'/>
                        <ConstructorElement text={ingredient.name}
                                            price={ingredient.price}
                                            thumbnail={ingredient.image}/>
                    </div>)
            }
        }
    )
    const bunElementBottom = props.addedIngredients.map((ingredient, index) => {
        if (ingredient.type === 'bun') {
            return (
                <ConstructorElement key={index} type='bottom' isLocked={true}
                                    text={ingredient.name + '  (низ)'}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}/>
            )
        }
    })

    return (
        <div className={style.constructorWrapper}>
            <div className={style.bunWrapper + ' ' + 'mt-4 mb-4'}>
                {bunElementTop}
            </div>
            <div className={style.wrapper + ' ' + style.customScroll}>
                <div className={style.addedIngredients + ' ' + 'pr-4'}>
                    {sauceAndMain}
                </div>
            </div>
            <div className={style.bunWrapper + ' ' + 'mt-4 '}>
                {bunElementBottom}
            </div>
        </div>
    )
}
BurgerConstructor.propTypes = {
    addedIngredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}
export default BurgerConstructor