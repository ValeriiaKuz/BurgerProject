import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './modal.module.css'
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {useCallback, useEffect} from "react";
import PropTypes from "prop-types";

const Modal = (props) => {
    const escClose = useCallback((event) => {
        if (event.keyCode === 27) {
            props.onClose()
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escClose);
        return () => {
            document.removeEventListener("keydown", escClose);
        };
    }, [escClose]);

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={props.onClose}>
                    <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={`${style.modalHeader} mt-10 ml-10 mr-10 text text_type_main-large`}>
                            <div>{props.header}</div>
                            <CloseIcon type="primary" onClick={props.onClose}/>
                        </div>
                        {props.children}
                    </div>
                </ModalOverlay>
            </>
        ),
        document.getElementById("modals")
    )
}
Modal.propTypes = {
    onClose:PropTypes.func.isRequired,
    header:PropTypes.string,
    children:PropTypes.element
}

export default Modal