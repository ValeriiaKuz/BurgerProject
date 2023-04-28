import AuthForm from "../../components/auth-form/auth-form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";

const ResetPassword = () => {
  const [valuePassword, setValuePassword] = useState("");
  const passwordRef = useRef(null);
  const [valueCode, setValueCode] = useState("");
  const codeRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <AuthForm
      title="Восстановление пароля"
      buttonTitle="Сохранить"
      navLinks={[
        {
          to: "/login",
          text: "Вспомнили пароль?",
          linkText: "Войти",
        },
      ]}
    >
      <Input
        type={"password"}
        placeholder={"Введите новый пароль"}
        onChange={(e) => setValuePassword(e.target.value)}
        value={valuePassword}
        error={false}
        ref={passwordRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
        icon={"ShowIcon"}
        onIconClick={onIconClick}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => setValueCode(e.target.value)}
        value={valueCode}
        error={false}
        ref={codeRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
    </AuthForm>
  );
};
export default ResetPassword;
