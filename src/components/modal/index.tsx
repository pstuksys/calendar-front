import styled from 'styled-components'
import Modal from 'react-modal';
import React from "react";

type TModal = {
    children:React.ReactNode;
    isOpen:boolean;
    onClose?:()=> void;
    style?: Modal.Styles
}

const customStyles:Modal.Styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display:"contents"
      },
  };

// Modal.setAppElement('#root');

const CustomModal = (props:TModal) => {
    const {children, isOpen, style, onClose} = props;

    const afterOpenModal =() => {}

    return (
        <ModalContainer>
            <Modal 
                shouldCloseOnOverlayClick={true}
                contentLabel="Example Modal"
                onAfterOpen={afterOpenModal}
                isOpen={isOpen} 
                onRequestClose={onClose}
                style={customStyles}
                portalClassName={"ReactModalPortal"}
                id='modal-one'
                bodyOpenClassName={
                    "ReactModal__Body--open"
                }
                >
                {children}
            </Modal>
        </ModalContainer>
    )
}

export default CustomModal

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 350px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;  
`