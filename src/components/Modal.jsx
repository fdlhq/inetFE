import React from 'react';
import '../css/modal.css'

const Modal = ({ show, setShow, children }) => {
    const modalStyle = {
        display: show ? 'block' : 'none',
    };

    return (
        <div className="modal" style={modalStyle}>
            <div className="modal-content">
                <span className="close" onClick={() => setShow(false)}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default Modal;
