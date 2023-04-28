import style from "./auth-form.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const AuthForm = ({ title, buttonTitle, children, navLinks }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.inputs}>
        <h2 className="text text_type_main-medium">{title}</h2>
        {children}
        <div>
          <Button htmlType="submit" type="primary" size="large">
            {buttonTitle}
          </Button>
        </div>
      </div>

      <div className={style.nav}>
        {navLinks.map((link) => (
          <div key={link.to}>
            <span className="text_type_main-default">{link.text}</span>
            <NavLink
              to={link.to}
              className={`${style.navLink} pl-3 text_type_main-default`}
            >
              {link.linkText}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthForm;
