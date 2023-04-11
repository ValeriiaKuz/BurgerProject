import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";
const ModalOverlay = ({ onClose, children }) => {
  return (
    <div className={style.overlay} onClick={onClose}>
      {children}
    </div>
  );
};
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};
export default ModalOverlay;
