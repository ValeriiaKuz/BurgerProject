import { FC, FormEvent, useRef, useState } from "react";
import AuthForm from "../../components/form/auth-form/auth-form";
import { singIn } from "../../services/actions/auth";
import EmailInput from "../../components/form/email/email";
import PasswordInput from "../../components/form/password/password";
import { useDispatch } from "../../utils/hooks/hooks";

const Login: FC = () => {
  const [valueEmail, setValueEmail] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const [valuePassword, setValuePassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isVisible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(singIn(valueEmail, valuePassword));
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
      handleSubmit={onHandleSubmit}
    >
      <EmailInput setValue={setValueEmail} value={valueEmail} ref={emailRef} />
      <PasswordInput
        setValue={setValuePassword}
        value={valuePassword}
        isVisible={isVisible}
        setVisible={setVisible}
        ref={passwordRef}
        placeholder={"Пароль"}
      />
    </AuthForm>
  );
};
export default Login;
