import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import style from "./profile.module.css";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [valueEmail, setValueEmail] = useState("");
  const emailRef = useRef(null);
  const [valuePassword, setValuePassword] = useState("");
  const passwordRef = useRef(null);
  const [valueName, setValueName] = useState("");
  const nameRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={style.wrapper}>
      <div className={`${style.nav} ml-5`}>
        <ul className="text text_type_main-medium mb-20">
          <li className="pt-4 pb-4">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? " activeNav" : "  navLink"
              }
            >
              Профиль
            </NavLink>
          </li>
          <li className="pt-4 pb-4">
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive ? " activeNav" : "  navLink"
              }
            >
              История заказов
            </NavLink>
          </li>
          <li className="pt-4 pb-4">
            <NavLink
              to="/login"
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
      <div className={style.inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          value={valueName}
          onChange={(e) => setValueName(e.target.value)}
          ref={nameRef}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          icon={"EditIcon"}
          onIconClick={onIconClick}
        />
        <Input
          type={"text"}
          placeholder={"Логин"}
          value={valueEmail}
          onChange={(e) => setValueEmail(e.target.value)}
          ref={emailRef}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          icon={"EditIcon"}
          onIconClick={onIconClick}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          value={valuePassword}
          onChange={(e) => setValuePassword(e.target.value)}
          ref={passwordRef}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          icon={"EditIcon"}
          onIconClick={onIconClick}
        />
      </div>
      <div className={style.empty}></div>
    </div>
  );
};
export default Profile;
