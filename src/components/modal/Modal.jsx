import css from './modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ closeModal, modalImg }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const onClickOverlay = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={onClickOverlay}>
      <div className={css.modal}>
        <img src={modalImg} alt="big" />
      </div>
    </div>
  );
};
