import styled from 'styled-components'
import Modal from 'react-modal';
import React from "react";

type TModal = {
    children:React.ReactNode;
    isOpen:boolean;
    onClose?:()=> void;
    style?: Modal.Styles
    modalId?:string;
}

const customStyles:Modal.Styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      zIndex:'9999'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        backdropFilter:'blur(5px)'
      },
  };

const CustomModal = (props:TModal) => {
    const {children, isOpen, style,modalId, onClose} = props;

    const afterOpenModal =() => {}

    return (
        <ModalContainer>
            <Modal 
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc
                contentLabel="Example Modal"
                onAfterOpen={afterOpenModal}
                isOpen={isOpen} 
                onRequestClose={onClose}
                style={customStyles}
                portalClassName={"ReactModalPortal"}
                id={modalId || 'modalOne'}
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
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;  
  backdrop-filter: blur(5px);
  .ReactModalPortal{
    position:relative;
    z-index: 9999;  
  } */
`