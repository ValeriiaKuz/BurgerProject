import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ children, header, onClose }) => {
  useEffect(() => {
    const escClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escClose);
    return () => {
      document.removeEventListener("keydown", escClose);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <div
            className={`${style.modalHeader} mt-10 ml-10 mr-10 text text_type_main-large`}
          >
            <div>{header}</div>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    document.getElementById("modals")
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
  children: PropTypes.element,
};

export default Modal;
