import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { singOut } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import style from "./logout.module.css";
import { FC } from "react";
import { useDispatch } from "../../utils/hooks/hooks";

export const LogOut: FC = () => {
  const dispatch = useDispatch();
  const token: string | undefined = getCookie("refreshToken");
  const onClick = () => {
    if (token) {
      dispatch(singOut(token));
    }
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
