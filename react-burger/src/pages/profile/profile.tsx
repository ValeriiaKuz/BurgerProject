import style from "./profile.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FC } from "react";

const Profile: FC = () => {
  const location = useLocation();
  return (
    <div className={style.wrapper}>
      <div className={`${style.nav} ml-5`}>
        <ul className="text text_type_main-medium mb-20">
          <li className="pt-4 pb-4">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                isActive ? " activeNav" : "  navLink"
              }
            >
              Профиль
            </NavLink>
          </li>
          <li className="pt-4 pb-4">
            <NavLink
              to="/profile/orders"
              className={({ isActive }) =>
                isActive ? " activeNav" : "  navLink"
              }
            >
              История заказов
            </NavLink>
          </li>
          <li className="pt-4 pb-4">
            <NavLink
              to="/profile/logout"
              className={({ isActive }) =>
                isActive ? " activeNav" : "  navLink"
              }
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <span className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <div
        className={
          location.pathname === "/profile/orders"
            ? style.outletWithMargin
            : style.outlet
        }
      >
        <Outlet />
      </div>
      {location.pathname !== "/profile/orders" ? (
        <div className={style.empty}></div>
      ) : null}
    </div>
  );
};

export default Profile;
