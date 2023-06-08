import { FC, FormEvent, useRef, useState } from "react";
import AuthForm from "../../components/form/auth-form/auth-form";
import { register } from "../../services/actions/auth";
import PasswordInput from "../../components/form/password/password";
import EmailInput from "../../components/form/email/email";
import NameInput from "../../components/form/name/name";
import { useDispatch } from "../../utils/hooks/hooks";

const Register: FC = () => {
  const [valueEmail, setValueEmail] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const [valuePassword, setValuePassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const [valueName, setValueName] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);
  const [isVisible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(valueEmail, valuePassword, valueName));
  };
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
        placeholder={"Пароль"}
        isVisible={isVisible}
        setVisible={setVisible}
        ref={passwordRef}
      />
    </AuthForm>
  );
};
export default Register;
