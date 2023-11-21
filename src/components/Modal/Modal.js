import ImagingModal from 'react-modal';
import { ModalPicture } from './Modal.style';

const customStyles = {
  overlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ImagingModal.setAppElement('#root');

export const Modal = ({largeImg, isOpen, isClose}) => {
  return (
    <ImagingModal
        isOpen={isOpen}
        onRequestClose={isClose}
        style={customStyles}
        contentLabel="Example Modal"
    >
      <div>
        <ModalPicture src={largeImg} alt=""/>
      </div>
      </ImagingModal>
  )
}