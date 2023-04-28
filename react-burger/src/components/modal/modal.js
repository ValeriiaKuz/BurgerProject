import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Modal = ({ children, header, onClose }) => {
  let navigate = useNavigate();

  useEffect(() => {
    const escClose = (event) => {
      if (event.key === "Escape") {
        navigate("/");
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
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <div
            className={`${style.modalHeader} mt-10 ml-10 mr-10 text text_type_main-large`}
          >
            <div>{header}</div>
            <CloseIcon
              type="primary"
              onClick={() => {
                navigate("/");
                onClose();
              }}
            />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    document.getElementById("modals")
  );
};
Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.element,
};

export default Modal;
