import style from "./modal.module.css";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { closeModal } from "../../services/actions/table-trains";

const modals = document.querySelector("#modals") as HTMLElement;

const Modal = () => {
  const { modalOpen } = useSelector((state) => state.tableTrains);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      event.key === "Escape" && onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={`${style.Modal} ${modalOpen && style.Modal_off}`}>
      <div className={style.ModalBlock}>
        <button className={style.ModalEscBtn} onClick={onClose}>
          Esc
        </button>
        <div className={style.ModalHeader}>
          <h1 className={style.ModalTitle}>Успешно!!</h1>
        </div>
      </div>

      <div className={style.ModalOverlay} onClick={onClose}></div>
    </div>,
    modals
  );
};

export default Modal;
