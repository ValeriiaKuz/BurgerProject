import { useRef, useState } from "react";
import AuthForm from "../../components/form/auth-form/auth-form";
import { register } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PasswordInput from "../../components/form/password/password";
import EmailInput from "../../components/form/email/email";
import NameInput from "../../components/form/name/name";

const Register = () => {
  const user = useSelector((store) => store.auth.user);
  const [valueEmail, setValueEmail] = useState("");
  const emailRef = useRef(null);
  const [valuePassword, setValuePassword] = useState("");
  const passwordRef = useRef(null);
  const [valueName, setValueName] = useState("");
  const nameRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(valueEmail, valuePassword, valueName));
  };
  if (user.name && user.email) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthForm
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      handleSubmit={onHandleSubmit}
      navLinks={[
        {
          to: "/login",
          text: "Уже зарегистрированы?",
          linkText: "Войти",
        },
      ]}
    >
      <NameInput setValue={setValueName} value={valueName} ref={nameRef} />
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
export default Register;
