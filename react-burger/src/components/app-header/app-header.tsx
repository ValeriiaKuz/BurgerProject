import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import React, { FC } from "react";

const AppHeader: FC = () => {
  return (
    <header className={`${style.header} pt-4 pb-4 m-5`}>
      <div className={style.wrapper}>
        <nav className={style.nav}>
          <ul className={style.navList}>
            <li className={`pr-5 ${style.navItem}`}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `activeNav text text_type_main-default`
                    : `navLink text text_type_main-default`
                }
              >
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                    <span className={`pl-2`}>Конструктор</span>
                  </>
                )}
              </NavLink>
            </li>
            <li className={`pl-5 pr-5  ${style.navItem}`}>
              <NavLink
                to="/feed"
                className={({ isActive }) =>
                  isActive
                    ? `activeNav text text_type_main-default`
                    : `navLink text text_type_main-default`
                }
              >
                {({ isActive }) => (
                  <>
                    <ListIcon type={isActive ? "primary" : "secondary"} />
                    <span className={`pl-2`}>Лента заказов</span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={style.logo}>
          <Logo />
        </div>

        <div className={`${style.profile} pb-4 pt-4`}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? `activeNav text text_type_main-default`
                : `navLink text text_type_main-default`
            }
          >
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                <span className={`pl-2`}>Личный кабинет</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
