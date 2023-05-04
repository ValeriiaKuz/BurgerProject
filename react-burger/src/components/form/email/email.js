import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const EmailInput = forwardRef(
  ({ setValue, value, placeholder = "E-mail" }, ref) => {
    return (
      <Input
        type={"email"}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        error={false}
        ref={ref}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
        required
      />
    );
  }
);
EmailInput.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
export default EmailInput;
