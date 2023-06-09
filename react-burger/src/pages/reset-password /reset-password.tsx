import AuthForm from "../../components/form/auth-form/auth-form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { sendResetPassword } from "../../services/actions/auth";
import PasswordInput from "../../components/form/password/password";
import { useDispatch, useSelector } from "../../utils/hooks/hooks";

const ResetPassword: FC = () => {
  const emailSendSuccess = useSelector((store) => store.auth.emailSendSuccess);
  const resetSuccess = useSelector((store) => store.auth.resetSuccess);
  const [valuePassword, setValuePassword] = useState<string>("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const [valueCode, setValueCode] = useState<string>("");
  const codeRef = useRef<HTMLInputElement>(null);
  const [isVisible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendResetPassword(valuePassword, valueCode));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (resetSuccess) {
      return navigate("/login");
    }
  }, [resetSuccess]);
  if (!emailSendSuccess) {
    return <Navigate to="/forgot-password" replace />;
  }
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
      handleSubmit={onHandleSubmit}
    >
      <PasswordInput
        setValue={setValuePassword}
        value={valuePassword}
        placeholder={"Пароль"}
        isVisible={isVisible}
        setVisible={setVisible}
        ref={passwordRef}
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
        required
      />
    </AuthForm>
  );
};
export default ResetPassword;
