import style from "./modal-overlay.module.css";
import { useNavigate } from "react-router-dom";
import { FC, PropsWithChildren } from "react";
import { ModalType } from "../modal/modal";
const ModalOverlay: FC<PropsWithChildren<ModalType>> = ({
  children,
  onClose,
}) => {
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

export default ModalOverlay;
