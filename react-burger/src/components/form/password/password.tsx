import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { forwardRef } from "react";
import { InputType } from "../../../utils/types/form-types";

const PasswordInput = forwardRef<HTMLInputElement, Required<InputType>>(
  ({ setValue, value, placeholder = "Пароль", isVisible, setVisible }, ref) => {
    return (
      <Input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={ref}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
        icon={isVisible ? "HideIcon" : "ShowIcon"}
        onIconClick={() => setVisible(!isVisible)}
        required
      />
    );
  }
);
export default PasswordInput;
