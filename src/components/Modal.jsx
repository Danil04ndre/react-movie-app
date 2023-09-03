import Frame from "./Frame";
import "../css/Modal.css";

import { useContext } from "react";
import HomeContext from "../context/HomeContext";

const Modal = () => {
  const { modalOpen, setModalOpen } = useContext(HomeContext);

  return (
    <div
      className={modalOpen ? "modal-container modal-active" : "modal-container"}
      onClick={() => setModalOpen(false)}
    >
      <Frame />
    </div>
  );
};

export default Modal;
