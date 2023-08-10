import css from './modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ closeModal, modalImg }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
