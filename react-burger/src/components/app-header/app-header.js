import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={`${style.header} pt-4 pb-4 m-5`}>
      <div className={style.wrapper}>
        <nav className={style.nav}>
          <ul className={style.navList}>
            <li className={`pr-5 ${style.navItem}`}>
              <a
                href="#"
                className={`${style.navLink} text text_type_main-default`}
              >
                <BurgerIcon type={"primary"} />
                <span className={`pl-2 ${style.active}`}>Конструктор</span>
              </a>
            </li>
            <li className={`pl-5 pr-5  ${style.navItem}`}>
              <a
                href="#"
                className={`text text_type_main-default ${style.navLink}`}
              >
                <ListIcon type="secondary" />
                <span className="pl-2">Лента заказов</span>
              </a>
            </li>
          </ul>
        </nav>
        <Logo className={style.logo} />
        <div className={`${style.profile} pb-4 pt-4`}>
          <a
            href="#"
            className={`text text_type_main-default text_color_inactive ${style.navLink}`}
          >
            <ProfileIcon type="secondary" />
            <span className="pl-2">Личный кабинет</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
