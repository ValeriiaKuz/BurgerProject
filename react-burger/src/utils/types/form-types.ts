import { FormEvent } from "react";

export type NavLinkType = {
  to: string;
  text: string;
  linkText: string;
};
export type AuthFormType = {
  title: string;
  buttonTitle: string;
  navLinks: Array<NavLinkType>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
export type InputType = {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  isVisible?: boolean;
  setVisible?: (value: boolean) => void;
};
