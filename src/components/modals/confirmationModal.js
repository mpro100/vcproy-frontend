import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ message, closeModal }) => {

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            marginRight: "-50%",
            display: "flex",
            transform: "translate(-50%, -50%)",
            width: "500px"
            
        },
        overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
          }
    };

  return (
    <Modal
      style={customStyles}
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Modal de Confirmación"
    >
      <div className='message'>
        <p>{message}</p>
        <p>
        <button className='btn-blue'onClick={closeModal}>Cerrar</button>
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;