import style from "../profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEditProfileInfo } from "../../../services/actions/auth";
type UserType = {
  email: string;
  name: string;
};
export const ProfileInputs: FC = () => {
  const { email, name }: UserType = useSelector(
    (store: any) => store.auth.user
  );
  const [valueEmail, setValueEmail] = useState<string>(email);
  const emailRef = useRef<HTMLInputElement>(null);
  const [valuePassword, setValuePassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const [valueName, setValueName] = useState<string>(name);
  const nameRef = useRef<HTMLInputElement>(null);
  const [isChanged, setChanged] = useState<boolean>(false);
  const [isEmailEditable, setEmailEditable] = useState<boolean>(false);
  const [isPasswordEditable, setPasswordEditable] = useState<boolean>(false);
  const [isNameEditable, setNameEditable] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onIconClick = (
    ref: RefObject<HTMLInputElement>,
    isEditableState: boolean,
    setEditableState: (editable: boolean) => void
  ) => {
    if (ref.current) {
      setEditableState(!isEditableState);
      if (ref.current.readOnly) {
        ref.current.focus();
      }
    }
  };
  const handleReset = (): void => {
    setValueEmail(email);
    setValueName(name);
    setValuePassword("");
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
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
        icon={isNameEditable ? "CloseIcon" : "EditIcon"}
        onIconClick={() =>
          onIconClick(nameRef, isNameEditable, setNameEditable)
        }
        readOnly={!isNameEditable}
      />
      <Input
        type={"email"}
        placeholder={"Логин"}
        value={valueEmail}
        onChange={(e) => setValueEmail(e.target.value)}
        ref={emailRef}
        size={"default"}
        extraClass="ml-1"
        icon={isEmailEditable ? "CloseIcon" : "EditIcon"}
        onIconClick={() =>
          onIconClick(emailRef, isEmailEditable, setEmailEditable)
        }
        readOnly={!isEmailEditable}
      />
      <Input
        type={isPasswordEditable ? "password" : "text"}
        placeholder={"Пароль"}
        value={valuePassword}
        onChange={(e) => setValuePassword(e.target.value)}
        ref={passwordRef}
        size={"default"}
        extraClass="ml-1"
        icon={isPasswordEditable ? "CloseIcon" : "EditIcon"}
        onIconClick={() =>
          onIconClick(passwordRef, isPasswordEditable, setPasswordEditable)
        }
        readOnly={!isPasswordEditable}
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
