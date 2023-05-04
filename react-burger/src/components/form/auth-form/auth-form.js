import style from "./auth-form.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const AuthForm = ({ title, buttonTitle, children, navLinks, handleSubmit }) => {
  return (
    <div className={style.wrapper}>
      <form className={style.inputs} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">{title}</h2>
        {children}
        <div>
          <Button htmlType="submit" type="primary" size="large">
            {buttonTitle}
          </Button>
        </div>
      </form>

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
AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  navLinks: PropTypes.arrayOf(PropTypes.object),
  handleSubmit: PropTypes.func.isRequired,
};
export default AuthForm;
