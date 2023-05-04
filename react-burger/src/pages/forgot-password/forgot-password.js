import { useEffect, useRef, useState } from "react";
import AuthForm from "../../components/form/auth-form/auth-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../services/actions/auth";
import EmailInput from "../../components/form/email/email";

const ForgotPassword = () => {
  const user = useSelector((store) => store.auth.user);
  const emailSendSuccess = useSelector((store) => store.auth.emailSendSuccess);
  const [valueEmail, setValueEmail] = useState("");
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendEmail(valueEmail));
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (emailSendSuccess === true) {
      return navigate("/reset-password");
    }
  }, [emailSendSuccess]);

  if (user.name && user.email) {
    return <Navigate to="/" replace />;
  }

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
      {" "}
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
