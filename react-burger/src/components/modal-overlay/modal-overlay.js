import style from './modal-overlay.module.css'
import PropTypes from "prop-types";
const ModalOverlay = (props) => {
    return (
        <div className={style.overlay} onClick={props.onClose}>
            {props.children}
        </div>
    )
}
ModalOverlay.propTypes = {
    onClose:PropTypes.func.isRequired,
    children:PropTypes.element
}
export default ModalOverlay