import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import AuthForm from "../../components/auth-form/auth-form";

const ForgotPassword = () => {
  const [valueEmail, setValueEmail] = useState("");
  const emailRef = useRef(null);

  return (
    <AuthForm
      title="Восстановление пароля"
      buttonTitle="Восстановить"
      navLinks={[
        {
          to: "/login",
          text: "Вспомнили пароль?",
          linkText: "Войти",
        },
      ]}
    >
      <Input
        type={"text"}
        placeholder={"Укажите e-mail"}
        onChange={(e) => setValueEmail(e.target.value)}
        value={valueEmail}
        error={false}
        ref={emailRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
    </AuthForm>
  );
};
export default ForgotPassword;
