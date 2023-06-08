import style from "./modal-overlay.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FC, PropsWithChildren } from "react";
import { ModalType } from "../modal/modal";
const ModalOverlay: FC<PropsWithChildren<ModalType>> = ({
  children,
  onClose,
}) => {
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <div
      className={style.overlay}
      onClick={() => {
        navigate(location.state?.background.pathname || "/");
        onClose();
      }}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
