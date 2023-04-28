import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import AuthForm from "../../components/auth-form/auth-form";

const Login = () => {
  const [valueEmail, setValueEmail] = useState("");
  const emailRef = useRef(null);
  const [valuePassword, setValuePassword] = useState("");
  const passwordRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <AuthForm
      title="Вход"
      buttonTitle="Вход"
      navLinks={[
        {
          to: "/register",
          text: "Вы — новый пользователь?",
          linkText: "Зарегистрироваться",
        },
        {
          to: "/forgot-password",
          text: "Забыли пароль?",
          linkText: "Восстановить пароль",
        },
      ]}
    >
      <Input
        type={"text"}
        placeholder={"E-mail"}
        onChange={(e) => setValueEmail(e.target.value)}
        value={valueEmail}
        error={false}
        ref={emailRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
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
        icon={"ShowIcon"}
        onIconClick={onIconClick}
      />
    </AuthForm>
  );
};
export default Login;
