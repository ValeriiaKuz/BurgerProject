import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const ModalOverlay = ({ children, onClose }) => {
  let navigate = useNavigate();
  return (
    <div
      className={style.overlay}
      onClick={() => {
        navigate("/");
        onClose();
      }}
    >
      {children}
    </div>
  );
};
ModalOverlay.propTypes = {
  children: PropTypes.element,
};
export default ModalOverlay;
