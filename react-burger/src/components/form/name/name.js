import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const NameInput = forwardRef(({ setValue, value }, ref) => {
  return (
    <Input
      type={"text"}
      placeholder={"Имя"}
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
});
NameInput.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default NameInput;
