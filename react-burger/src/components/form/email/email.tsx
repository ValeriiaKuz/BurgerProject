import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { forwardRef } from "react";
import { InputType } from "../../../utils/types/form-types";
const EmailInput = forwardRef<HTMLInputElement, InputType>(
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

export default EmailInput;
