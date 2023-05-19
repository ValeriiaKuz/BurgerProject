import { useRef, useState } from "react";
import AuthForm from "../../components/form/auth-form/auth-form";
import { useDispatch } from "react-redux";
import { singIn } from "../../services/actions/auth";
import EmailInput from "../../components/form/email/email";
import PasswordInput from "../../components/form/password/password";

const Login = () => {
  const [valueEmail, setValueEmail] = useState("");
  const emailRef = useRef(null);
  const [valuePassword, setValuePassword] = useState("");
  const passwordRef = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const onHandleSubmit = (e) => {
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
      />
    </AuthForm>
  );
};
export default Login;
