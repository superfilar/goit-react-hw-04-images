import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import style from './Modal.module.css';

// class Modal extends Component {
//   static propTypes = { closeFn: propTypes.func, loader: propTypes.func };

const Modal = ({ onClose, modalImage }) => {
  // componentDidMount() {
  //   console.log('Modal component did Mount');
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  const handleBackdrope = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={style.Overlay} onClick={handleBackdrope}>
      <div className={style.Modal}>
        <img src={modalImage} alt="modal" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  modalImage: propTypes.element,
};
export default Modal;
