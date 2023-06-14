import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export type ModalType = {
  header?: string;
  onClose: () => void;
};
const Modal: FC<PropsWithChildren<ModalType>> = ({
  children,
  header,
  onClose,
}) => {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    const escClose = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        navigate(location.state?.background.pathname || "/");
        onClose();
      }
    };
    document.addEventListener("keydown", escClose);
    return () => {
      document.removeEventListener("keydown", escClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div
          className={style.modal}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            e.stopPropagation()
          }
        >
          <div
            className={`${style.modalHeader} mt-10 ml-10 mr-10 text text_type_main-large`}
          >
            <div>{header}</div>
            <CloseIcon
              type="primary"
              onClick={() => {
                navigate(location.state?.background.pathname || "/");
                onClose();
              }}
            />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    document.getElementById("modals")!
  );
};

export default Modal;
