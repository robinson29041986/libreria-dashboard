import ReactDOM from "react-dom"
import { Close } from "@easy-eva-icons/react";

const Modal = ({ isOpen, onClose, title, children }) => isOpen ? ReactDOM.createPortal(
  <div className="modal">
    <div className="modal_box" role="dialog" aria-modal="true">
      <div className="modal_header">
        <h4 className="subheading">{title}</h4>
        <Close className="modal_icon" onClick={onClose} />
      </div>
      <div className="modal_content">
        {children}
      </div>
    </div>
  </div >, document.body
) : null;


export default Modal;