import ReactDOM from 'react-dom';
import { CloseOutline } from '@easy-eva-icons/react';

const ConfirmationModal = (props) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal_box" role="dialog" aria-modal="true">
        <div className="modal_header">
          <h4 className="subheading">{props.title}</h4>
          <CloseOutline className="modal_icon" onClick={props.onClose} />
        </div>
        <div className="modal_content">
          <p>{props.message}</p>
          <div className="modal_buttons">
            <button className="btn btn-secondary" onClick={props.onCancel}>
              Cancelar
            </button>
            <button className="btn btn-warning" onClick={props.onConfirm}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div >, document.body
  )
}

export default ConfirmationModal;