import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './app-header.module.css'
function AppHeader () {
    return(
        <header className={style.header + ' ' + 'pt-4 pb-4 m-5'}>
            <div className={style.wrapper}>
                <nav className={style.nav}>
                    <ul className={style.navList}>
                        <li className={'pr-5' + ' '+style.navItem}>
                            <BurgerIcon type={"primary"} />
                            <a href='#' className={'text text_type_main-default text_color_primary'+' '+ style.navLink}>
                                Конструктор
                            </a>
                        </li>
                        <li className={'pl-5 pr-5'+' '+style.navItem}>
                            <ListIcon type="secondary" />
                            <a href='#'  className={'text text_type_main-default'+' '+style.navLink}>
                                Лента заказов
                            </a>
                        </li>
                    </ul>
                </nav>
                <Logo className={style.logo}/>
                <div className={style.profile+' '+' pb-4 pt-4'}>
                    <ProfileIcon type="secondary"/>
                    <a href='#'  className={'text text_type_main-default text_color_inactive'+' '+style.navLink}>
                        Личный кабинет
                    </a>
                </div>
            </div>
        </header>
    )
}
export default AppHeader