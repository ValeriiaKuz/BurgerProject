import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import AuthForm from "../../components/auth-form/auth-form";

const Register = () => {
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
    <AuthForm
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      navLinks={[
        {
          to: "/login",
          text: "Уже зарегистрированы?",
          linkText: "Войти",
        },
      ]}
    >
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValueName(e.target.value)}
        value={valueName}
        error={false}
        ref={nameRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
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
export default Register;
