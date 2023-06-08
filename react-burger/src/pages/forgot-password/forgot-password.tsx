import { FC, FormEvent, useEffect, useRef, useState } from "react";
import AuthForm from "../../components/form/auth-form/auth-form";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../services/actions/auth";
import EmailInput from "../../components/form/email/email";
import { useDispatch, useSelector } from "../../utils/hooks/hooks";

const ForgotPassword: FC = () => {
  const emailSendSuccess = useSelector((store) => store.auth.emailSendSuccess);
  const [valueEmail, setValueEmail] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendEmail(valueEmail));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (emailSendSuccess) {
      return navigate("/reset-password");
    }
  }, [emailSendSuccess]);
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
      handleSubmit={onHandleSubmit}
    >
      <EmailInput
        setValue={setValueEmail}
        value={valueEmail}
        ref={emailRef}
        placeholder={"Укажите e-mail"}
      />
    </AuthForm>
  );
};
export default ForgotPassword;
