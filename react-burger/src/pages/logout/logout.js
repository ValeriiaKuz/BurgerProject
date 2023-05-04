import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { singOut } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import style from "./logout.module.css";

export const LogOut = () => {
  const dispatch = useDispatch();
  const token = getCookie("refreshToken");
  const onClick = () => {
    dispatch(singOut(token));
  };
  return (
    <div className={style.wrapper}>
      <h2 className="text text_type_main-medium">
        Вы действительно хотите выйти?
      </h2>
      <div>
        <Button htmlType={"button"} onClick={onClick}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
