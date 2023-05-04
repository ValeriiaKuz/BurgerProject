import style from "../profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEditProfileInfo } from "../../../services/actions/auth";

export const ProfileInputs = () => {
  const { email, name } = useSelector((store) => store.auth.user);
  const [valueEmail, setValueEmail] = useState(email);
  const emailRef = useRef({ readOnly: true });
  const [valuePassword, setValuePassword] = useState("");
  const passwordRef = useRef({ readOnly: true });
  const [valueName, setValueName] = useState(name);
  const nameRef = useRef({ readOnly: true });
  const [isChanged, setChanged] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const dispatch = useDispatch();
  const onIconClick = (ref) => {
    ref.current.readOnly = !ref.current.readOnly;
    setOnClick(!onClick);
    if (!ref.current.readOnly) {
      ref.current.focus();
    }
  };
  const handleReset = () => {
    setValueEmail(email);
    setValueName(name);
    setValuePassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendEditProfileInfo(valueName, valueEmail, valuePassword));
  };
  useEffect(() => {
    if (
      email !== valueEmail ||
      name !== valueName ||
      valuePassword.length > 0
    ) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  });
  return (
    <form className={style.inputs} onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        value={valueName}
        onChange={(e) => setValueName(e.target.value)}
        ref={nameRef}
        size={"default"}
        extraClass="ml-1"
        icon={nameRef.current.readOnly ? "EditIcon" : "CloseIcon"}
        onIconClick={() => onIconClick(nameRef)}
        readOnly={nameRef.current.readOnly}
      />
      <Input
        type={"email"}
        placeholder={"Логин"}
        value={valueEmail}
        onChange={(e) => setValueEmail(e.target.value)}
        ref={emailRef}
        size={"default"}
        extraClass="ml-1"
        icon={emailRef.current.readOnly ? "EditIcon" : "CloseIcon"}
        onIconClick={() => onIconClick(emailRef)}
        readOnly={emailRef.current.readOnly}
      />
      <Input
        type={passwordRef.current.readOnly ? "password" : "text"}
        placeholder={"Пароль"}
        value={valuePassword}
        onChange={(e) => setValuePassword(e.target.value)}
        ref={passwordRef}
        size={"default"}
        extraClass="ml-1"
        icon={passwordRef.current.readOnly ? "EditIcon" : "CloseIcon"}
        onIconClick={() => onIconClick(passwordRef)}
        readOnly={passwordRef.current.readOnly}
      />
      {isChanged && valueEmail && valueName && (
        <div>
          <Button htmlType={"reset"} type={"secondary"} onClick={handleReset}>
            Отмена
          </Button>
          <Button htmlType={"submit"}>Сохранить</Button>
        </div>
      )}
    </form>
  );
};
