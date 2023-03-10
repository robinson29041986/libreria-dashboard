import ReactDOM from "react-dom";
import { CloseOutline } from "@easy-eva-icons/react"

const ModalForm = (props) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal_box" role="dialog" aria-modal="true">
        <div className="modal_header">
          <h4 className="subheading">{props.title}</h4>
          <CloseOutline className="modal_icon" onClick={props.onClose} />
        </div>
        <div className="modal_content">
          {props.children}
        </div>
      </div>
    </div >, document.body
  )
};

export default ModalForm;